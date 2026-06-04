export const licenses = [
	"Template",
	"MIT",
	"Apache-2.0",
	"MPL-2.0",
	"LGPL-3.0-or-later",
	"GPL-3.0-or-later",
	"BSD-3-Clause",
	"CC0-1.0",
	"Unlicense"
];

const LICENSE_NOT_FOUND = "No license found. Please specify a valid license.";

const licenseFiles = import.meta.glob(
    "./templates/license/*.txt",
    {
        query: "?raw",
        import: "default",
        eager: true,
    }
) as Record<string, string>;

export function readLicenseText(
    license: string
): string {
    if (!licenses.includes(license)) {
        throw new Error(LICENSE_NOT_FOUND);
    }

    const path = `./templates/license/${license}.txt`;
    return licenseFiles[path];
}

export function computeLicenseErrors(
	customLicense: boolean,
	license: string
): string[] | undefined {
	if (!customLicense && !licenses.includes(license)) {
		return [LICENSE_NOT_FOUND];
	}

	return undefined;
}

export function formatLicense(
    raw: string,
    authorText: string
): string {
    const decoded = JSON.parse(`"${raw}"`);

    return decoded
        .replace(/<(?:copyright holders|owner|fullname)>/gi, authorText)
        .replace(/<year>/gi, String(new Date().getFullYear()));
}