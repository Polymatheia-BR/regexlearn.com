import { useEffect, useState, useCallback } from "react";

import lookie from "lookie";

import Header from "../LearnHeader";
import Step from "../Step";
import Navigation from "../Navigation";

import Mousetrap from "../../utils/mousetrap";
import data from "../../data.json";
import shortcuts from "../../shortcuts";

export default function Learn() {
  const progress = lookie.get("completedSteps") || [];
  const lastStep = lookie.get("lastStep") || 0;
  const [step, setStep] = useState(lastStep);
  const [success, setSuccess] = useState(progress.includes(data[step]));
  const [error, setError] = useState(false);

  const prevStep = useCallback(
    (e) => {
      e.preventDefault();

      if (step > 0) {
        setStep(step - 1);
      }
    },
    [step]
  );

  const nextStep = useCallback(
    (e) => {
      e.preventDefault();

      if (!success) {
        setError(true);
        clearTimeout(window.learnErrorTimer);
        window.learnErrorTimer = setTimeout(() => {
          setError(false);
        }, 1000);
        return;
      }

      if (step < data.length - 1) {
        setError(false);
        setStep(step + 1);
      }
    },
    [step, success]
  );

  const onChangeSuccess = (status) => {
    setSuccess(status);
  };

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.rootKey, (e) => e.preventDefault());
    Mousetrap.bindGlobal(shortcuts.prevStep, prevStep);
    Mousetrap.bindGlobal(shortcuts.nextStep, nextStep);

    lookie.set("lastStep", step);

    return () => {
      Mousetrap.unbind(shortcuts.rootKey);
      Mousetrap.unbind(shortcuts.prevStep);
      Mousetrap.unbind(shortcuts.nextStep);
    }
  }, [step, success, prevStep, nextStep]);

  return (
    <>
      <Header steps={data} step={step} />
      <Step
        data={data[step]}
        step={step}
        onChangeSuccess={onChangeSuccess}
        error={error}
      />
      <Navigation
        steps={data}
        step={step}
        prevStep={prevStep}
        nextStep={nextStep}
        success={success}
        error={error}
      />
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}