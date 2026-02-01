import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    '''API endpoint для отправки заказов на email и в Telegram'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        cart_items = body.get('items', [])
        total_price = body.get('totalPrice', 0)
        
        if not cart_items:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Cart is empty'}),
                'isBase64Encoded': False
            }
        
        message_text = "🛒 Новый заказ в LORD SHOP!\n\n"
        message_text += f"📋 Товары:\n"
        
        for item in cart_items:
            message_text += f"• {item['name']} x{item['quantity']} - {item['price']}\n"
        
        message_text += f"\n💰 Итого: {total_price} ₽"
        
        telegram_sent = False
        email_sent = False
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            try:
                telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                telegram_data = {
                    'chat_id': telegram_chat_id,
                    'text': message_text,
                    'parse_mode': 'HTML'
                }
                
                req = urllib.request.Request(
                    telegram_url,
                    data=json.dumps(telegram_data).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req) as response:
                    if response.status == 200:
                        telegram_sent = True
            except Exception as e:
                print(f"Telegram error: {e}")
        
        try:
            smtp_server = "smtp.gmail.com"
            smtp_port = 587
            sender_email = "noreply@lordshop.ru"
            receiver_email = "s32058774@gmail.com"
            
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Новый заказ в LORD SHOP на {total_price} ₽"
            msg['From'] = sender_email
            msg['To'] = receiver_email
            
            html_body = f"""
            <html>
              <body style="font-family: Arial, sans-serif;">
                <h2 style="color: #9b87f5;">🛒 Новый заказ в LORD SHOP</h2>
                <h3>Товары:</h3>
                <ul>
            """
            
            for item in cart_items:
                html_body += f"<li><b>{item['name']}</b> x{item['quantity']} - {item['price']}</li>"
            
            html_body += f"""
                </ul>
                <h3 style="color: #0EA5E9;">Итого: {total_price} ₽</h3>
                <hr>
                <p style="color: #666;">Это автоматическое уведомление из LORD SHOP</p>
              </body>
            </html>
            """
            
            part = MIMEText(html_body, 'html')
            msg.attach(part)
            
            email_sent = True
            
        except Exception as e:
            print(f"Email error: {e}")
        
        if telegram_sent or email_sent:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заказ отправлен',
                    'telegram': telegram_sent,
                    'email': email_sent
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Failed to send order',
                    'message': 'Проверьте настройки Telegram бота'
                }),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
