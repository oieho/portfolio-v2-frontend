// Dockerfile
# 1. node �̹��� ���
FROM    node:16-alpine

# 2. ��Ű�� �켱 ����
COPY    ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN     npm install

# 3. �ҽ� ����
COPY . /usr/src/app

# 4. WEB ���� ���� (Listen ��Ʈ ����)
EXPOSE 3000
CMD    npm start

// .dockerignore 
node_modules