# Ginkgo Classroom Emailer

[![Build Status](https://travis-ci.org/neagle/classroom-emailer.svg?branch=master)](https://travis-ci.org/neagle/classroom-emailer)

The Ginkgo classroom at Lee Montessori has three weekly services provided by student families. This project parses the sign-up sheet in `tsv` form and sends reminder emails to the families who have signed up a few days beforehand.

## Configuration

To run the function, you need a `.env` file with

1. Your gmail username and an [app-specific password](https://myaccount.google.com/apppasswords)
2. The unique key for your Google spreadsheet (check your spreadsheet's URL: it's the hash after `/d/`)
3. A comma-separated list of the room parents' email addresses. Not the _family_ email addresses, but the parents who are managing classroom volunteer stuff for the year.

You can use the `sample.env` file, included in the repo, as reference.

```sh
cp sample.env .env
```

Sending these emails to actual people requires a `src/familyEmails.js` file, which is not included in this repo for privacy reasons. Consult `src/sample.familyEmails.js` for reference on how to format it.

Scheduling the script to actually run is done through the AWS console using CloudWatch, not through any configuration present in this project.

## Usage

The function is an AWS lambda, which gets uploaded and independently scheduled via CloudWatch to run daily at a certain time (8 AM, currently). It is controlled via a few different flags in the event object it receives:

<!-- prettier-ignore-start -->
| key | type | Description | Default
| --- | --- | --- | --- |
| debug | boolean | Displays more information via console.log when run, and doesn't send any actual emails. | true |
| date | string | Override the automatic date with a different date of your choosing. | undefined |
| sendToRealPeople | boolean | Setting this to true will send notifications to actual people: if false, sends all email to me. | false |
<!-- prettier-ignore-end -->

To start, you'll need node. Then run

```sh
npm install
```

You can invoke the function locally using the event object in `debug-send-event.js`:

```sh
# runs the current src/index.js
npm run invoke

# runs the current built file in build/index.js
npm run invoke-built
```

The project uses webpack to bundle and minify the JavaScript into a single file, then zips it and the other files it needs into a single file, ready to upload.

To actually upload these changes to AWS, make sure you have the `aws-cli` set up and properly credentialed, then run

```sh
npm run upload
```
