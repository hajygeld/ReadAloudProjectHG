"""Library functions for calling in application code."""
import base64
import typing
from urllib.request import urlopen

from PIL import Image

import PyPDF2

from bs4 import BeautifulSoup

import docx

from gtts import gTTS

from tesserocr import PyTessBaseAPI


class TextMP3Response(typing.TypedDict):
    """Type for Text and MP3 Response."""

    text: str
    mp3: str


def make_text_and_mp3_response(text: str) -> TextMP3Response:
    """Given text, returns a JSON including text and MP3."""
    # If there is no text, return that there was no text detected
    if text.strip() == "":
        text = "Error: no text detected."

    return {"text": text, "mp3": tts_to_mp3(text)}


def tts_to_mp3(text: str) -> str:
    """Save text to .mp3 file with TTS included."""
    # Take in the text desired, the top-level domain and the language desired.
    mp3_convert = gTTS(text, tld="com", lang="en")
    mp3_convert.save("speech.mp3")

    with open("speech.mp3", "rb") as f:
        content = f.read()
        encoded = base64.b64encode(content)

    return encoded.decode()


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def convert_pdf_to_text(name: str) -> str:
    """Convert text within PDF file to plain text."""
    # create a pdf file object
    pdf_file_obj = open(name, "rb")

    # create a pdf reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)

    # create a page object
    page_obj = pdf_reader.pages[0]

    # extract text from page
    text = page_obj.extract_text()

    # close the pdf file object
    pdf_file_obj.close()

    return text


def convert_docx_to_plain_text(name: str) -> str:
    """Convert text within .docx to plain text."""
    doc = docx.Document(name)

    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)

    return "\n".join(full_text)


def convert_website_text(url: str) -> typing.Any:
    """Convert website text to plain text."""
    # Make a .get() request for the URL:
    html = urlopen(url)

    # Parse the HTML:
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text()

    # Break the text into lines and remove trailing spaces for each line:
    lines = (line.strip() for line in text.splitlines())

    # Break multiple headlines into a line each:
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))

    # Drop any blank lines.
    text = "\n".join(chunk for chunk in chunks if chunk)

    return text
