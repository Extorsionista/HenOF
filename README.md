# PS4 BlueHost — redesigned dashboard

A responsive, blue-accented front-end concept for a friendlier PS4 MPS / GoldHEN host experience.

## Included
- Automatic best-effort PS4 firmware detection from the browser user agent.
- Network state indicator.
- AppCache API status detection when the browser exposes it.
- Manual status refresh.
- Direct links to the original MPS cache page, exploit page, and source repository.
- Responsive layout for desktop, mobile, and PS4 browser-sized screens.

## Important integration note
This package is a **dashboard redesign**, not a reimplementation of MPS exploit logic. It does not include the original exploit scripts, firmware offsets, GoldHEN binary, or an offline-cache manifest. The “Open MPS host” button and action links open the upstream MPS project at:

- https://mansoor0x.github.io/mps/
- https://github.com/mansoor0x/mps

The cache status shown here applies only to this dashboard's own origin. It cannot report the cache state of the upstream MPS origin. Offline cache installation must be performed on the actual host origin and verified in the PS4 browser.

To create a fully self-hosted build, obtain the original repository from its maintainer, preserve its directory structure and required assets, and integrate this interface into the original entry page without renaming exploit assets or changing firmware-specific code. Do not assume a successful browser cache event proves the exploit itself works.

## Run locally
This is a static site. Open `index.html` for a visual preview, or serve the folder over HTTP:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

For use from a PS4, host the site on a computer or local server reachable from the console. A normal HTTP server is preferable to opening local files with `file://`.

## Files
- `index.html` — page structure
- `styles.css` — visual design and responsive layout
- `app.js` — firmware, network, and cache-status detection

## Safety and compatibility
Firmware detection is based on a user-agent string and may be unavailable or inaccurate. It is not a security check. Exploit attempts may crash or freeze a console. Back up important data and use only software intended for your exact firmware.
