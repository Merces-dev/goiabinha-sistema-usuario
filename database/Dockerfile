FROM mcr.microsoft.com/mssql/server:2019-latest

# Change to user root, which is needed if I want to set the executable permission for entrypoint.sh
USER root

COPY setup.sql setup.sql
COPY import-data.sh import-data.sh
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh

CMD /bin/bash ./entrypoint.sh