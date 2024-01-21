# -*- coding: utf-8 -*-


from ultralytics import YOLO
from PIL import Image
import boto3
from botocore.exceptions import NoCredentialsError

import asyncio
import uvicorn

import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path

model1=YOLO("dental_stain.pt")
model2=YOLO("calculus.pt")
model3=YOLO("spaces.pt")
model4=YOLO("cavity.pt")

DO_SPACES_ENDPOINT = 'https://intellident.blr1.digitaloceanspaces.com'
DO_SPACES_KEY = 'DO00KKDEETCWVTYLENQ8'
DO_SPACES_SECRET = 'YupnzNV8FYe6ijStoXWfagPwwzTvgkrL9rM6Vkq61XY'
DO_BUCKET_NAME = 'intellident'

# Create a session using your DigitalOcean Spaces credentials
session = boto3.session.Session()
client = session.client('s3',
                        region_name='your-region',  # e.g., 'nyc3'
                        endpoint_url=f'https://{DO_SPACES_ENDPOINT}',
                        aws_access_key_id=DO_SPACES_KEY,
                        aws_secret_access_key=DO_SPACES_SECRET)

# Function to upload an image to DigitalOcean Spaces
def upload_to_spaces(local_file_path, destination_key):
    try:
        client.upload_file(local_file_path, DO_BUCKET_NAME, destination_key)
        return True
    except NoCredentialsError:
        print("Credentials not available")
        return False

app = FastAPI()
@app.post("/get_image")
async def get_image(upload_file: UploadFile = File(...)):
    with open(upload_file.filename, "wb") as file:
            file.write(upload_file.file.read())
    results1 = model1(upload_file.filename)
    results2 = model2(upload_file.filename)
    results3 = model3(upload_file.filename)
    results4 = model4(upload_file.filename)
    random_string1 = str(uuid.uuid4())
    for r in results1:
        im_array = r.plot(conf=False)  # plot a BGR numpy array of predictions
        im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
        processed_filename = f"effected_{random_string1}.jpeg"
        im.save(processed_filename) # show image

    image_path1 = Path(processed_filename)
    num_objects_detected1=len(results1)
    if num_objects_detected1>0:
        status1="positive"
    else:
        status1="negative"

    image_url1 = f"/images/{processed_filename}"
    random_string2 = str(uuid.uuid4())
    for r in results2:
        im_array = r.plot(conf=False)  # plot a BGR numpy array of predictions
        im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
        processed_filename = f"effected_{random_string2}.jpeg"
        im.save(processed_filename) # show image

    image_path2 = Path(processed_filename)
    num_objects_detected2=len(results2)
    if num_objects_detected2>1:
        status2="positive"
    else:
        status2="negative"
    image_url2 = f"/images/{processed_filename}"
    random_string3 = str(uuid.uuid4())
    for r in results3:
        im_array = r.plot(conf=False)  # plot a BGR numpy array of predictions
        im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
        processed_filename = f"effected_{random_string3}.jpeg"
        im.save(processed_filename) # show image

    image_path3 = Path(processed_filename)
    num_objects_detected3=len(results3)
    if num_objects_detected3>1:
        status3="positive"
    else:
        status3="negative"
    image_url3 = f"/images/{processed_filename}"
    random_string4 = str(uuid.uuid4())
    for r in results3:
        im_array = r.plot(conf=False)  # plot a BGR numpy array of predictions
        im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
        processed_filename = f"effected_{random_string4}.jpeg"
        im.save(processed_filename) # show image

    image_path4 = Path(processed_filename)
    num_objects_detected4=len(results4)
    if num_objects_detected4>1:
        status4="positive"
    else:
        status4="negative"
    image_url4 = f"/images/{processed_filename}"
    upload_to_spaces(processed_filename1, f'images/{processed_filename1}')
    upload_to_spaces(processed_filename2, f'images/{processed_filename2}')
    upload_to_spaces(processed_filename3, f'images/{processed_filename3}')
    upload_to_spaces(processed_filename4, f'images/{processed_filename4}')

    # Update image URLs to point to the DigitalOcean Spaces bucket
    image_url1 = f"https://{DO_BUCKET_NAME}.{DO_SPACES_ENDPOINT}/images/{processed_filename1}"
    image_url2 = f"https://{DO_BUCKET_NAME}.{DO_SPACES_ENDPOINT}/images/{processed_filename2}"
    image_url3 = f"https://{DO_BUCKET_NAME}.{DO_SPACES_ENDPOINT}/images/{processed_filename3}"
    image_url4 = f"https://{DO_BUCKET_NAME}.{DO_SPACES_ENDPOINT}/images/{processed_filename4}"
    response_data = {
            "dentalStain": {
                "status": status1,
                "link": image_url1
            },
            "dentalCalculus": {
                "status": status2,
                "link": image_url2
            },
            "spacesBetweenTeeth": {
                "status": status3,
                "link": image_url3
            },
            "dentalCavity": {
                "status": status4,
                "link": image_url4
            }
        }
    return JSONResponse(content=response_data)


if __name__ == "__main__":
    config = uvicorn.Config(app)
    server = uvicorn.Server(config)
    loop = asyncio.get_running_loop()
    loop.create_task(server.serve())



num_objects_detected4

