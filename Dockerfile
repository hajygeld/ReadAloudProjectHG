FROM python:3.10-slim-buster
RUN apt update
RUN apt install -y gcc build-essential libtesseract-dev libleptonica-dev tesseract-ocr
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
