const { exec } = require("child_process");

// Define the packages and their expected versions
const packages = {
    "expo": "~52.0.38",
    "expo-constants": "~17.0.8",
    "expo-router": "~4.0.18",
    "react-native-safe-area-context": "4.12.0",
    "jest-expo": "~52.0.6"
};

// Generate the install command
const installCommand = `npm install ${Object.entries(packages)
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(" ")}`;

console.log("Updating packages to expected versions...");

// Execute the install command
exec(installCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error updating packages: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log("Packages updated successfully:");
    console.log(stdout);
});
