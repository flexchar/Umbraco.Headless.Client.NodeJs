<p align="center">
  <img src="https://github.com/umbraco/Umbraco.Headless.Client.NodeJs/raw/master/.github/img/logo.png" alt="Umbraco Heartcore Logo" />
</p>

<hr>

# NodeJS Client Library for Umbraco Heartcore

Umbraco Heartcore is the headless CMS version of Umbraco as a Service.

This repository contains the Node.JS client library for the Umbraco Heartcore REST APIs.

## Install

```bash
> npm install @umbraco/headless-client
```

## Usage

Create a client, then call commands on it

```typescript

// client.ts
import {Client} from '@umbraco/headless-client'

const client = new Client({
  projectAlias: 'your-project-alias',
  apiKey: 'your-api-key'
})

export default client

// rootLinks.ts
async function rootLinks(client: Client) {
  const rootContent = await client.delivery.content.root()

  const childPages = rootContent.map(child => ({
    url: child._url,
    name: child.name
  }))

  return childPages
}

function linkGenerator(links: {url: string, name: string}[]) {
  return links.map(link => {
    return `<a href="${link.url}">${link.name}</a>`
  })
}

async function main() {
  const rootLinks = await rootLinks(require('./client').default)
  const links = linkGenerator(rootLinks)
  console.log(links)
}

```

## Available clients

All client calls will return an instance of `ApiRequest` class.

For fetching content the promise method must be called example below:

```ts
client.delivery.content.root()
  .then(response => {
    console.log(response)
  })
```

## Content Delivery

### Content

```ts
client.delivery.content.root()
client.delivery.content.byId(id: string)
client.delivery.content.byUrl(url: string)
client.delivery.content.children(url: string)
client.delivery.content.ancestors(id: string)
client.delivery.content.descendants(id: string)

// TS Example:
import {ContentResponseElement} from '@umbraco/headless-client'

client.delivery.content.root<T extends ContentResponseElement>(): ApiRequest<T>
```

### Media

```ts
client.delivery.media.root()
client.delivery.media.byId(id: string)
client.delivery.media.children(id: string)
```

### Content Management

#### Content

```ts
client.management.content.root()
client.management.content.byId(id: string)
client.management.content.children(id: string)
client.management.content.create(body: CreateContentBody)
client.management.content.publish(id: string)
client.management.content.unPublish(id: string)
client.management.content.update(id: string, body: ContentResponseElement)
client.management.content.delete(id: string)
```

#### Content Type

```ts
client.management.contentType.all()
client.management.contentType.byAlias(alias: string)
```

#### Media

```ts
client.management.media.root()
client.management.media.byId(id: string)
client.management.media.children(id: string)
client.management.media.create(body: any)
client.management.media.update(id: string, body: any)
client.management.media.delete(id: string)
```

#### Media Type

```ts
client.management.mediaType.all()
client.management.mediaType.byAlias()
```

#### Language

```ts
client.management.language.all()
client.management.language.byISOCode(isoCode: string)
client.management.language.create(data: CreateContentLanguageType)
client.management.language.update(isoCode: string, data: CreateContentLanguageType)
client.management.language.delete(isoCode: string)
```

#### Relation

```ts
client.management.relation.byId(id: string)
client.management.relation.byAlias(alias: string)
client.management.relation.byChild(id: string)
client.management.relation.byParent(id: string)
client.management.relation.create(data: any)
client.management.relation.delete(id: string)
```

#### Relation Type

```ts
client.management.relationType.byAlias(alias: string)
```


#### Member

```ts
client.management.member.byUsername(username: string)
client.management.member.create(data: ContentCreateMemberType)
client.management.member.update(username: string, data: ContentCreateMemberType)
client.management.member.addGroup(username: string, groupName: string)
client.management.member.removeGroup(username: string, groupName: string)
client.management.member.delete(username: string)
```

#### Member Group

```ts
client.management.memberGroup.byName(name: string)
client.management.memberGroup.create(data: ContentMemberCreateGroupType)
client.management.memberGroup.delete(name: string)
```

#### Member Type

```ts
client.management.memberType.all()
client.management.memberType.byAlias(alias: string)
```
