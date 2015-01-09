spreadsheet:
	node ./tools/download_xlsx.js
	node ./tools/build_data_json.js

# 2592000 seconds = 30 days
deploy:
	aws s3 sync --delete --acl public-read \
	  --cache-control public,max-age=2592000 \
	  dist s3://graphics.texastribune.org/dailies/all-roads-lead-to-texas/

