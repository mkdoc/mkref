# Link References

<? @include readme/badges.md ?>

> Collect link references

<? @include {=readme} introduction.md install.md ?>

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mkref/gm} usage.js ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
