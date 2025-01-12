const { ContainerClient } = require("@azure/storage-blob");
require("dotenv").config();

const CONTAINER_SAS_URL = process.env.AZURE_SAS_CONTAINER_URL;

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
