"""Application entrypoint."""

import typing
from http.client import BAD_REQUEST

from PIL import Image

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.library import convert_docx_to_plain_text
from app.library import convert_image_to_text
from app.library import convert_pdf_to_text
from app.library import convert_website_text
from app.library import make_text_and_mp3_response

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])


@app.get("/")
def root() -> dict[str, str]:
    """Return hello world. Useful to verify that the server is alive."""
    return {"message": "Hello, world!"}


@app.post("/image")
def image(file: UploadFile) -> typing.Any:
    """Accept an image file and output the text within the image."""
    image_content_types = ("image/jpeg", "image/png")
    if file.content_type not in image_content_types:
        raise HTTPException(
            status_code=BAD_REQUEST,
            detail="Invalid file content type for image.",
        )

    image_data = Image.open(file.file)
    text = convert_image_to_text(image_data)

    return make_text_and_mp3_response(text)


@app.post("/docx")
def docx(file: UploadFile) -> typing.Any:
    """Accept a .docx file name and output the text within it."""
    contents = file.file.read()

    with open("app/document.docx", "wb") as f:
        f.write(contents)
        text = convert_docx_to_plain_text("app/document.docx")

    return make_text_and_mp3_response(text)


@app.post("/pdf")
def pdf(file: UploadFile) -> typing.Any:
    """Accept a PDF file name and output the text within it."""
    contents = file.file.read()

    with open("app/file.pdf", "wb") as f:
        f.write(contents)
        text = convert_pdf_to_text("app/file.pdf")

    return make_text_and_mp3_response(text)


@app.post("/text")
def text(plain_text: str) -> typing.Any:
    """Accept plain text."""
    return make_text_and_mp3_response(plain_text)


@app.post("/url")
def url(url_web: str) -> typing.Any:
    """Accept website URL and parse the text within it."""
    website_text = convert_website_text(url_web)
    return make_text_and_mp3_response(website_text)
