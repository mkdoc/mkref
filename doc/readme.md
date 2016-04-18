# Link References

<? @include readme/badges.md ?>

> Collect link references

Collates link references from all documents in the stream and flushes a paragraph with the link references at the end of the stream.

<? @include {=readme} install.md ?>

***
<!-- @toc -->
***

<? @include {=readme} usage.md example.md help.md ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
