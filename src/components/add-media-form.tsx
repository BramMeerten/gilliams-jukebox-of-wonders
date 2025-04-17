import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Music } from "@/model/music";

interface Value {
  url?: string;
  title?: string;
  subtitle?: string;
  videoId?: string;
  image?: string;
}

const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addMediaClicked: (value: Music, callback: (error?: any) => void) => void;
}

export const AddMediaForm = ({ addMediaClicked }: Props) => {
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: unknown }>({});
  const [saveError, setSaveError] = useState<string | undefined>();
  const [value, setValue] = useState<Value>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.url === undefined) {
      return; // Skip initial value
    }

    fetchYoutubeInfo(value.url).then(({errors, value}) => {
      if (errors !== undefined) {
        setErrors(oldErrors => ({ ...oldErrors, ...errors}));
      } else {
        setValue(oldValue => ({ ...oldValue, ...value}));
        setErrors(oldErrors => ({ ...oldErrors, url: undefined }));
      }
    });
  }, [value.url, setErrors, setValue]);

  const updateTitle = (title: string) => {
    setValue((value) => ({ ...value, title }));

    const hasError = validate({ title }).title;
    setErrors((errors) => ({ ...errors, title: hasError || undefined }));
  };

  const validate = (value: Value): { [key: string]: boolean } => {
    return {
      url: !value.videoId,
      title: !value.title?.trim()?.length,
      subtitle: false,
      image: !value.image,
    };
  };

  const validationErrors = validate(value);
  const isValid = Object.values(validationErrors).every((error) => !error);

  const closeModal = () => {
    setShowAddMedia(false);
    setErrors({});
    setValue({});
    setSaveError(undefined);
    setLoading(false);
  }

  const addClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    const media = {image: value.image!, title: value.title!, subtitle: value.subtitle, videoId: value.videoId!};
    setLoading(true);
    setSaveError(undefined);

    addMediaClicked(media, error => {
      if (!error) {
        closeModal();
      } else {
        setLoading(false);
        setSaveError('message' in error ? error.message : 'Something went wrong, try again.');
        console.log('Failed to add media:', error);
      }
    });
  };

  return (
    <div
      onClick={() => setShowAddMedia(true)}
      className="relative w-36 h-40 rounded-l-2xl overflow-hidden shadow-lg group cursor-pointer flex items-center justify-center hover:scale-105 transition-transform duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent transition duration-300"></div>
      <div className="relative z-10 text-white text-5xl font-light group-hover:scale-110 transition-transform duration-300">
        +
      </div>
      <Modal visible={showAddMedia} onClose={closeModal}>
        <div className="text-xl font-semibold pt-2 pb-2">Add Youtube Media {showAddMedia ? 'SHOW' : 'HIDE'}</div>
        { saveError && <div className="mb-2 text-sm text-red-500">{saveError}</div> }

        <InputForm
          setValue={(url) => setValue({ ...value, url })}
          value={value.url}
          placeholder="Enter YouTube URL*"
          errorMessage={
            errors?.url ? "Please enter a valid YouTube URL." : undefined
          }
        />
        <InputForm
          setValue={(title) => updateTitle(title)}
          value={value.title}
          placeholder="Title*"
          errorMessage={errors?.title ? "Please add a valid Title." : undefined}
        />
        <InputForm
          setValue={(subtitle) => setValue((value) => ({ ...value, subtitle }))}
          value={value.subtitle}
          placeholder="Subtitle"
        />

        {value.image && (
          <div className="w-full p-2 aspect-72/40">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{backgroundImage: `url(${value.image})`}}
            />
          </div>
        )}

        <button
          className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-md transition cursor-pointer font-semibold mt-4 min-w-24 float-right disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
          disabled={!isValid || loading}
          onClick={addClicked}>
          { loading ? 'Adding..' : 'Add' }
        </button>
      </Modal>
    </div>
  );
};

const InputForm = ({
  value,
  setValue,
  errorMessage,
  placeholder,
}: {
  value?: string;
  setValue: (val: string) => void;
  errorMessage?: string;
  placeholder: string;
}) => {
  return (
    <div className="max-w-sm mx-auto">
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 block w-full border p-2 text-black bg-white rounded-md shadow-sm ${!errorMessage ? "border-gray-300" : "border-red-500"}`}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

type YoutubeResponse = {errors?: {[key: string]: unknown}, value?: Partial<Value>};

const fetchYoutubeInfo = async (url: string): Promise<YoutubeResponse> => {
  const regexMatch = YOUTUBE_ID_REGEX.exec(url ?? "");
  if (!regexMatch || regexMatch.length != 2) {
    return { errors: {url: true} };
  }

  try {
    const ytId = regexMatch[1];
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`);
    const body = await response.json();

    return { value: {
      title: body.title,
      image: `https://i.ytimg.com/vi_webp/${ytId}/sddefault.webp`,
      videoId: ytId,
    } };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(unused: unknown) {
    return { errors: {url: undefined} };
  }
}
