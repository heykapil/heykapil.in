---
id: d1c232377e9f812
title: ACL policies of Digital ocean spaces bucket
description: Na.
datetimeCreate: 2024-01-09 14:31:13
datetimeUpdate: 2024-01-09 17:24:18
logo: next.svg
created: 2024-01-09T18:14
updated: 2024-01-09T18:14
---

Digital Ocean Buckets

- We have to use the command line interface to change the default policy of the digital ocean spaces bucket.
- Install awscli tool.

```bash
brew install awscli
```

- Once install is finished, put the access key and secret to configure the cli, keep remaining things same.

```bash
aws configure
```

- Check if you are able to reach the bucket or not? Replace your endpoint url with your bucket regional endpoint url.

```bash
 aws s3 ls --endpoint-url=https://blr1.digitaloceanspaces.com
```

- It should return the bucket list. If not then configure with the access id and secret again.

- Now create a file named `policy.json` in the root directory where terminal is running.

```json
// policy.json

{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<NAME_OF_BUCKET>/*"
    }
  ]
}
```

- Replace the name of bucket with your bucket name.

- Now put the policy file to change the acl policy of the aws bucket.

```bash
aws s3api --endpoint=https://blr1.digitaloceanspaces.com put-bucket-policy --bucket <NAME_OF_BUCKET>  --policy file://policy.json
```

