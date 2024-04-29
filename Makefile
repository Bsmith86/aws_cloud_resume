.PHONY: build

build: 
	sam build

deploy-infra: 
	sam build && aws-vault exec VaultUser --no-session -- sam deploy

deploy-site: 
	aws-vault exec VaultUser --no-session -- aws s3 sync ./brandons-aws s3://brandonsaws.com

invoke-put:
	sam build && aws-vault exec VaultUser --no-session -- sam local invoke MyPutFunction
invoke-get:
	sam build && aws-vault exec VaultUser --no-session -- sam local invoke MyGetFunction