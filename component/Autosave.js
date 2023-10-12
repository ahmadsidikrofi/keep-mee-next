import React, { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

import { LOCAL_STORAGE_KEY } from "../pages/index"; // Import LOCAL_STORAGE_KEY directly

const DEBOUNCE_SAVE_DELAY_MS = 1000;

export default function Autosave({ experimentData }) {
  // This is the side effect we want to run on users' changes.
  // In this example, we persist the changes in the localStorage.
  const saveExperimentData = useCallback((newExperimentData) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, newExperimentData.name);
    console.log("Saved successfully!");
  }, []);

  const debouncedSave = useCallback(
    debounce(async (newExperimentData) => {
      saveExperimentData(newExperimentData);
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (experimentData) {
      debouncedSave(experimentData);
    }
  }, [experimentData, debouncedSave]);

  // Do not display anything on the screen.
  return null;
}