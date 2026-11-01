import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
try:
    s.bind(("127.0.0.1", 8000))
    print("Port 8000 is FREE and available for binding!")
    s.close()
except Exception as e:
    print("Port 8000 error:", e)
