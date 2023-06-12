export interface Image {
  image: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
          xsmall: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: null;
            size: number;
            width: number;
            height: number;
          };
          thumbnail: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: null;
            size: number;
            width: number;
            height: number;
          };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: null;
        provider: string;
        provider_metadata: null;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}
