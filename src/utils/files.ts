import { saveAs } from "file-saver";
import JSZip from "jszip";

const downloadImages = async (
  files: any,
  zipName: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const zip = new JSZip();
    const remoteZips = files.map(async (file: any) => {
      const response = await fetch(file);
      const data = await response.blob();
      const fileName = file.split("/").pop();
      zip.file(`Phallus #${fileName}`, data);

      return data;
    });

    Promise.all(remoteZips)
      .then(() => {
        zip.generateAsync({ type: "blob" }).then((content: any) => {
          // give the zip file a name
          saveAs(content, `${zipName}.zip`);
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

const downloadFile = (
  url: string,
  fileType: "png" | "gif" | "mp4",
  name: string
) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.${fileType}`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    });
};

export { downloadFile, downloadImages };
