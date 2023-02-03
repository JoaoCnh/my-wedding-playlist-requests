import { createEffect, createSignal, JSX, Show } from "solid-js";
import cx from "classnames";

import LeftChevron from "./LeftChevron";
import PauseCircle from "./PauseCircle";
import PlayCircle from "./PlayCircle";
import RightChevron from "./RightChevron";
import DoubleLeftChevron from "./DoubleLeftChevron";
import DoubleRightChevron from "./DoubleRightChevron";
import Shuffle from "./Shuffle";

type HTMLButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

function ControlButton(props: HTMLButtonProps) {
  return (
    <button
      {...props}
      class={cx(
        props.class,
        "text-center rounded-full text-rose-500 disabled:text-rose-500/30"
      )}
    />
  );
}

function SmallerButton(props: HTMLButtonProps) {
  return <ChevronButton {...props} class={cx(props.class, "w-8 h-8")} />;
}

function ChevronButton(props: HTMLButtonProps) {
  return <ControlButton {...props} class={cx(props.class, "w-12 h-12")} />;
}

function PlayPauseButton(props: HTMLButtonProps) {
  return <ControlButton {...props} class={cx(props.class, "w-24 h-24")} />;
}

export default function MusicControls(props: MusicControlsProps) {
  const { onPrev, onNext, onGoToStart, onGoToEnd, onShuffle } = props;

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
    <div class="relative mx-auto flex items-center justify-evenly my-7 px-4 bg-slate-50 rounded-full drop-shadow-xl">
      <SmallerButton
        disabled={props.prevDisabled}
        onClick={() => onGoToStart()}
        aria-label="Jump to the start"
      >
        <DoubleLeftChevron class="w-full" />
      </SmallerButton>

      <ChevronButton
        disabled={props.prevDisabled}
        onClick={() => onPrev()}
        aria-label="Previous album"
      >
        <LeftChevron class="w-full" />
      </ChevronButton>

      <Show
        when={playing()}
        fallback={
          <PlayPauseButton onClick={() => play()} aria-label="Play song">
            <PlayCircle class="w-full" />
          </PlayPauseButton>
        }
      >
        <PlayPauseButton onClick={() => pause()} aria-label="Pause song">
          <PauseCircle class="w-full" />
        </PlayPauseButton>
      </Show>

      <ChevronButton
        disabled={props.nextDisabled}
        onClick={() => onNext()}
        aria-label="Next album"
      >
        <RightChevron class="w-full" />
      </ChevronButton>

      <SmallerButton
        disabled={props.nextDisabled}
        onClick={() => onGoToEnd()}
        aria-label="Jump to the end"
      >
        <DoubleRightChevron class="w-full" />
      </SmallerButton>

      <ChevronButton
        class="absolute -bottom-14"
        onClick={() => onShuffle()}
        aria-label="Shuffle"
      >
        <Shuffle class="w-full text-white drop-shadow-2xl" />
      </ChevronButton>
    </div>
  );
}

interface MusicControlsProps {
  previewUrl: string;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onNext: () => void;
  onGoToStart: () => void;
  onPrev: () => void;
  onGoToEnd: () => void;
  onShuffle: () => void;
}
