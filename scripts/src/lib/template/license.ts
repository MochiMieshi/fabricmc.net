function extractLicenseIds(): string[] {
	const licenseFiles = import.meta.glob(
		"./templates/license/*.txt",
		{
			query: "?raw",
			import: "default",
			eager: true,
		}
	) as Record<string, string>;

	return Object.keys(licenseFiles).map((path) => {
		const match = path.match(/\/([^\/]+)\.txt$/);
		if (match) {
			return match[1];
		}
		throw new Error(`Invalid license file path: ${path}`);
	});
}

export var licenses = extractLicenseIds();

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

export function readTemplateLicenseText(): string {
	return readLicenseText("Template");
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
    text: string,
    authorText: string
): string {
    return text
        .replace(/<holders>/gi, authorText)
        .replace(/<year>/gi, String(new Date().getFullYear()));
}