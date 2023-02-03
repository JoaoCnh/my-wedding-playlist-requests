import { createEffect, createSignal, JSX, Show } from "solid-js";

import LeftChevron from "./LeftChevron";
import PauseCircle from "./PauseCircle";
import PlayCircle from "./PlayCircle";
import RightChevron from "./RightChevron";

function ChevronButton(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class="w-20 h-20 p-4 text-center rounded-full text-rose-500 disabled:text-rose-500/30"
      {...props}
    />
  );
}

function PlayPauseButton(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class="w-28 h-28 p-4 text-center rounded-full text-rose-500"
      {...props}
    />
  );
}

export default function MusicControls(props: MusicControlsProps) {
  const { onPrev, onNext } = props;

  let audioPlayer: HTMLAudioElement | undefined;

  const [playing, setPlaying] = createSignal(false);

  const play = () => {
    setPlaying(true);
    audioPlayer?.play();
  };

  const pause = () => {
    setPlaying(false);
    audioPlayer?.pause();
  };

  createEffect(() => {
    if (audioPlayer) {
      audioPlayer.src = props.previewUrl;
      playing() && play();
    } else {
      audioPlayer = new window.Audio(props.previewUrl);
    }

    audioPlayer.onended = () => {
      pause();
    };
  });

  return (
    <div class="mx-auto flex items-center justify-evenly my-7 bg-slate-50 rounded-full drop-shadow-xl">
      <ChevronButton disabled={props.prevDisabled} onClick={() => onPrev()}>
        <LeftChevron class="w-full" />
      </ChevronButton>

      <Show
        when={playing()}
        fallback={
          <PlayPauseButton onClick={() => play()}>
            <PlayCircle class="w-full" />
          </PlayPauseButton>
        }
      >
        <PlayPauseButton onClick={() => pause()}>
          <PauseCircle class="w-full" />
        </PlayPauseButton>
      </Show>

      <ChevronButton disabled={props.nextDisabled} onClick={() => onNext()}>
        <RightChevron class="w-full" />
      </ChevronButton>
    </div>
  );
}

interface MusicControlsProps {
  previewUrl: string;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}
