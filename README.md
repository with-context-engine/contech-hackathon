# 🚀 SaaS Starter

![Static Badge](https://img.shields.io/badge/shadcn%2Fui-0.8.0-blue?link=https%3A%2F%2Fgithub.com%2Fshadcn%2Fui)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?&logo=bun&logoColor=white)


## 🌟 Features

* 📦 Monorepo structure with Turborepo for efficient build system and caching
* ⚡ Next.js for fast, server-side rendered React applications
* 📚 Nextra for easy-to-create documentation sites
* 🎨 shadcn/ui for beautiful, customizable UI components
* 🐰 Bun as a fast, all-in-one JavaScript runtime
* 🌿 Biome for fast, opinionated linting and formatting
* 🔄 Automated dependency management with Dependabot
* 🚀 CI/CD setup with GitHub Actions
* 🧑‍🔧 Clerk for authentication
* 💽 Supabase for database and real-time data

## 🚀 Quick Start

```sh
# Clone the repository
gh repo clone with-context-engine/contech-hackathon

# Navigate to the project directory
cd contech-hackathon

# Install dependencies
bun install

# Start development server
bun run dev
```

### Add UI Components

```sh
bun ui:add:component <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI. 🎨

## What's inside? 📦

```mermaid
graph TD
    A[Turborepo] --> B[Apps]
    A --> C[Packages]
    B --> D[@repo/docs]
    B --> E[@repo/web]
    C --> G[@repo/ui]
    C --> H[@repo/utils]
    C --> I[@repo/tsconfig]
```


| App/Package | Description |
|-------------|-------------|
| `@repo/docs` | Documentation site powered by [Nextra 3 alpha](https://the-guild.dev/blog/nextra-3) 📖 |
| `@repo/web` | Main Next.js web application 🌐 |
| `@repo/ui` | Core React components and design system shared by both `web` and `docs` applications (powered by shadcn/ui) 🎨 |
| `@repo/utils` | Shared React utilities 🛠️ |
| `@repo/tsconfig` | Shared `tsconfig.json` configurations 🛡️ |

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). 💪

## More Details

<details>
<summary>Click to expand</summary>

### Utilities 🧰

This Turborepo has some additional tools already set up for you:

* [TypeScript](https://www.typescriptlang.org/) for static type checking ✅
* [Biome](https://biomejs.dev/) for code linting, formatting, and fixing 🌿
* [Changesets](https://github.com/changesets/changesets) for managing versioning, changelogs, and publishing 📝

### Useful commands 🤖

* `bun build` - Build all apps and packages
* `bun dev` - Develop all apps and packages
* `bun dev:ui` - Develop all apps and packages and display the output in Turbo's new experimental UI
* `bun lint` - Lint and format all packages
* `bun lint:fix` - Lint, format, and fix all packages
* `bun changeset` - Generate a changeset 🧑‍🔧 - WIP
* `bun clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)
* `bun ui:add:component` - Add a shadcn/ui component to the `@repo/ui` package

### Add a new app or package 📦

Turborepo offers a simple command to add new apps or packages to the monorepo. To add a new app, run the following command:


```sh
bun turbo gen workspace [--name <app-name>]
```


You will be prompted to choose the name and workspace type (app or package) of the new app and which app or package to copy.

> [! NOTE]
> Remember to run `bun install` after copying an app. ⚠️

### CI 🤖

This Turborepo uses [GitHub Actions](https://github.com/features/actions) for CI. 🤖

It comes preconfigured with the following workflow that runs on every push or pull request to the `main` branch:

1. **Setup**: Checks out the code and sets up Bun.
2. **Install**: Installs all dependencies using Bun.
3. **Build**: Builds all apps and packages in the monorepo.
4. **Lint**: Performs linting and formatting checks using [Biome](https://biomejs.dev/).

### Automated Dependency Management & Contributor Recognition 🤖

This template includes some useful automation tools:

#### 1. Dependabot Configuration 🔄

Keeps dependencies up-to-date automatically with daily checks and update rules.

[View Dependabot Config](.github/dependabot.yml)

#### 2. Auto-merge for Dependabot PRs 🔀

Can automatically merges patch updates from Dependabot to reduce manual work.

[View Auto-merge Workflow](.github/workflows/auto-merge-dependabot.yml)

For the auto-merge workflow:

* Go to your repository's Settings > Actions > General.
* Under "Workflow permissions", select "Read and write permissions".
* Check "Allow GitHub Actions to create and approve pull requests".
* Save the changes.
* Optionally, create a Personal Access Token (PAT) with `repo` scope and add it as a repository secret named `GITHUB_TOKEN` for enhanced security.

#### 3. Automated Contributors List 🙌

Maintains an up-to-date list of contributors in your README.

[View Contributors Workflow](.github/workflows/contributors.yml)

### 🚀 Getting Started

1. Dependabot is active out-of-the-box. Review and adjust the config as needed.
2. Ensure proper permissions for the auto-merge workflow.
3. To read more about the contributors list, see the [contributors-readme-action](https://github.com/akhilmhdh/contributors-readme-action) README.

## Versioning and Publishing packages 📦

🧑‍🔧 WIP

For more information, refer to the official [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md).

## Deployment 🚀

This Turborepo is set up for easy deployment of its various applications.

### Vercel Deployment 🌐

The `docs` and `web` apps can be deployed to Vercel without any additional configuration. This allows for quick and easy deployment of your Next.js applications.

#### Test Deployments

You can view the test deployments for these apps:

* `apps/web`: [https://turborepo-shadcn-nextjs-web.vercel.app/](https://turborepo-shadcn-nextjs-web.vercel.app/)
* `apps/docs`: [https://turborepo-shadcn-nextjs-docs.vercel.app/](https://turborepo-shadcn-nextjs-docs.vercel.app/)

## Useful Links and Thanks 🙏

### Build Tools and Configuration

* [Turborepo Documentation](https://turbo.build/repo/docs)
  + [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
  + [Caching](https://turbo.build/repo/docs/core-concepts/caching)
  + [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
  + [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
  + [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
  + [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
* [Bun Documentation](https://bun.sh/docs)
* [Biome Documentation](https://biomejs.dev/guides/getting-started/)

### Frameworks and Libraries

* [Next.js Documentation](https://nextjs.org/docs)
* [Nextra Documentation](https://nextra.site/docs)
* [shadcn/ui Documentation](https://ui.shadcn.com/docs)

## Contributors 👨‍💻

<!-- readme: collaborators, contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/gmickel">
                    <img src="https://avatars.githubusercontent.com/u/139907?v=4" width="100;" alt="gmickel"/>
                    <br />
                    <sub><b>Gordon Mickel</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators, contributors -end -->
</details>