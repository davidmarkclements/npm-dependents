# npm-dependents

There's currently no npm command for retrieving
a list or count of modules that depend on a given
package.

This is a useful metric for evaluating a modules
potential usefulness. 

## Install

```sh
[sudo] npm -g install npm-dependants
```

## Usage

```sh

  npm-dependents [module]
  npm-dependents [-l] [--list] [module]
  npm-dependents [-r] [--raw] [module]
  npm-dependents [-h] [--help]

  With no flags, shows a count of all dependents.

  -h | --help Shows usage
  -l | --list List all dependents
  -r | --raw  Show only the count, not surrounding text

  If a module name is not provided the current directory is 
  expected to contain a package.json with a name field, which
  is then used as the module name.

```