aws lambda invoke --profile gokibitz --function-name gingko-emailer --payload '{"key": "value"}' out
sed -i "" 's/"//g' out
sleep 15
aws logs get-log-events --profile gokibitz --log-group-name /aws/lambda/gingko-emailer --log-stream-name $(< out) --limit 5
