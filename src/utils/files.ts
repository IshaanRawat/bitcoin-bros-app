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

export { downloadImages };
