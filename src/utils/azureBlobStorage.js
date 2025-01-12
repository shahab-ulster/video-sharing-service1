const { ContainerClient } = require("@azure/storage-blob");
require("dotenv").config();

const CONTAINER_SAS_URL =
  process.env.AZURE_SAS_CONTAINER_URL ||
  "https://videosstorage101.blob.core.windows.net/videos?sp=racwdli&st=2025-01-12T16:44:36Z&se=2025-01-13T00:44:36Z&sv=2022-11-02&sr=c&sig=j1TTwx4pgqi4eilnRcKODlthhTMzJYJO%2FbhX8umORWY%3D";

const containerClient = new ContainerClient(
  process.env.AZURE_SAS_CONTAINER_URL
);

const uploadToAzureBlob = async (buffer, fileName) => {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    console.log(`Uploading ${fileName} to Azure Blob Storage...`);

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: "video/mp4" },
    });

    console.log(`File uploaded successfully: ${blockBlobClient.url}`);
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading file to Azure Blob Storage:", error.message);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

module.exports = { uploadToAzureBlob };
