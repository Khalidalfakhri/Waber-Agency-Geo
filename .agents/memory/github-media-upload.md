---
name: GitHub upload and large media
description: Constraints for publishing this project through the connected GitHub API while keeping oversized media out of the repository.
---

For a newly created empty GitHub repository, create an initial commit through the Contents API before creating Git blobs and trees; the Git data endpoints otherwise return “Git Repository is empty.”

**Why:** The connected GitHub integration can publish through the REST API even when local Git credentials fail, but an empty repository has no object database for the blob endpoint until its first commit exists.

**How to apply:** Use a private repository and upload the source as blobs/tree/commit. Keep duplicate oversized videos in public App Storage and reference one shared object from the site instead of adding Git LFS content.