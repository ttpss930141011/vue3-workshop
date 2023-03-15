FROM nginx:latest

# 將項目根目錄下dist文件夾下的所有文件複製到鏡像中 /usr/share/nginx/html/ 目錄下
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
