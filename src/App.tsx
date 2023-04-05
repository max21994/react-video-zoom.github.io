import "./App.css";

import {
  Button,
  Container,
  FormControlLabel,
  Paper,
  Slider,
  Switch,
} from "@mui/material";
import {
  ReactVideoZoom,
  pauseReactVideoZoom,
  playReactVideoZoom,
} from "react-video-zoom";
import { useRef, useState } from "react";

import VideoPath from "./test_video_3.mp4";
import VideoPathHD from "./test_video_3_1440.mp4";

function App() {
  const [zoom, setZoom] = useState(1);
  const [isHQ, setHQ] = useState(false);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);

  const refs = { mainVideoRef, zoomVideoRef };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  };

  return (
    <Container>
      <Paper
        sx={{
          padding: "60px",
          "@media (max-width: 800px)": {
            padding: "15px",
          },
          margin: "60px 0",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
        elevation={4}
      >
        <h1 style={{ margin: "0" }}>react-video-zoom</h1>
        <ReactVideoZoom
          src={isHQ ? VideoPathHD : VideoPath}
          zoom={zoom}
          refs={refs}
          muted
          loop
        />
        <div style={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isHQ}
                onChange={(event) => setHQ(event.target.checked)}
              />
            }
            label="Load HQ Video (45 MB)"
          />
        </div>
        <div style={{ width: "100%", marginBottom: "15px" }}>
          <Button onClick={() => playReactVideoZoom(refs)}>Play</Button>
          <Button onClick={() => pauseReactVideoZoom(refs)}>Pause</Button>
        </div>
        <Slider
          value={zoom}
          onChange={handleChange}
          min={1}
          max={10}
          valueLabelDisplay="on"
          getAriaValueText={(value) => `Zoom: ${value} X`}
          valueLabelFormat={(value) => `Zoom: ${value} X`}
          step={0.1}
        />
      </Paper>
    </Container>
  );
}

export default App;
