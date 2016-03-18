# Link References

<? @include readme/badges.md ?>

> Collect link references

Collates link references from all documents in the stream and flushes a paragraph with the link references at the end of the stream.

<? @include {=readme} install.md ?>

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mkref/gm} usage.js ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
