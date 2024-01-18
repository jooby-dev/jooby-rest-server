# defaults if makefile used without root setup
JOOBY_LOG_LEVEL ?= info

JOOBY_SERVER_CONTAINER_NAME ?= jooby-rest-server
JOOBY_SERVER_IMAGE_NAME ?= joobydev/${JOOBY_SERVER_CONTAINER_NAME}

build:
	docker build \
		--pull \
		--tag ${JOOBY_SERVER_IMAGE_NAME} \
		--no-cache \
		-f ./dockerfile \
		..

stop:
	docker stop ${JOOBY_SERVER_CONTAINER_NAME}

purge:
	docker rmi ${JOOBY_SERVER_IMAGE_NAME}

clean:
	docker stop ${JOOBY_SERVER_CONTAINER_NAME}
	docker rm ${JOOBY_SERVER_CONTAINER_NAME}

push:
	docker push ${JOOBY_SERVER_IMAGE_NAME}

pull:
	docker pull ${JOOBY_SERVER_IMAGE_NAME}

run:
	docker run \
		--restart unless-stopped \
		--env "LOG_LEVEL=trace" \
		--network host \
		--name ${JOOBY_SERVER_CONTAINER_NAME} \
		${JOOBY_SERVER_IMAGE_NAME}
