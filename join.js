async function joinParts(files, contentType) {
    let output = {};
    for (const file in files) {
        output[file] = new Blob(
            await Promise.all(files[file].map(url => fetch(url).then(res => res.arrayBuffer()))),
            { type: contentType }
        )
    }
    await Promise.all(Object.keys(output).map(async file => {
        output[file] = await output[file];
    }));
    return output;
}