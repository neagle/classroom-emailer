aws lambda invoke --profile gokibitz --function-name ginkgo-emailer --payload '{"key": "value"}' out
sed -i "" 's/"//g' out
sleep 15
aws logs get-log-events --profile gokibitz --log-group-name /aws/lambda/ginkgo-emailer --log-stream-name $(< out) --limit 5
