FROM mongo

RUN openssl rand -base64 756 > /keyfile \
  && chmod 600 /keyfile \
  && chown 999 /keyfile \
  && chgrp 999 /keyfile

CMD ["--bind_ip_all", "--keyFile", "/keyfile", "--replSet", "rs0"]