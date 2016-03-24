FROM python:3.4
WORKDIR /code

# Python requirements
ADD ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

# Install node
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y build-essential nodejs

# Node requirements
ADD ./package.json /code/package.json
RUN npm install

# Move the rest of the code in
ADD . /code

# Compile the front-end
RUN npm run dist

# Run the server
CMD python ./app.py
