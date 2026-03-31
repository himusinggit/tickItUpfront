import { useState } from "react";
import { useForm,Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import DescriptionForm from "../components/InputDescription";
import Input from "../components/Input";
import ImageInput from "../components/ImageInput";
import Loader from "../components/Loader";

// ─────────────────────────────────────────────
// STEP CONFIG
// Each step has a label and the field names it owns.
// We use fieldNames to know which fields to validate
// before allowing the user to proceed to the next step.
// ─────────────────────────────────────────────
const STEPS = [
  {
    number: 1,
    label: "Details",
    description: "Basic event information",
    fieldNames: ["eventName", "eventDate", "eventTime", "venue", "price", "totalSeats"],
  },
  {
    number: 2,
    label: "Photo",
    description: "Upload a cover image",
    fieldNames: ["backgroundImage"],
  },
  {
    number: 3,
    label: "Description",
    description: "Describe your event",
    fieldNames: ["description"],
  },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
function CreateEventForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed: 0, 1, 2

  // shouldUnregister: false → RHF keeps field values even when a step is hidden.
  // Without this, going to step 3 would lose step 1 & 2 data on submit.
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({ mode: "onTouched", shouldUnregister: false });

  // ── API call ──
  const createEventMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/ticketTemplates",
        formData,
        { withCredentials: true }
      );
      return response.data.data;
    },
    onSuccess: () => navigate("/"),
    onError: () => alert("Failed to create event. Please try again."),
  });

  // ── Called when the final "Create Event" button is submitted ──
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("eventName",       data.eventName);
    formData.append("eventDate",       data.eventDate);
    formData.append("eventTime",       data.eventTime);
    formData.append("venue",           data.venue);
    formData.append("price",           data.price);
    formData.append("totalSeats",      data.totalSeats);
    formData.append("backgroundImage", data.backgroundImage[0]);
    formData.append("description",     data.description);
    createEventMutation.mutate(formData);
  };

  // ── Validate current step's fields, then advance ──
  const handleNext = async () => {
    const currentFieldNames = STEPS[currentStep].fieldNames;
    const isValid = await trigger(currentFieldNames);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const isLastStep  = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // Note: All three steps are always rendered in the DOM (just hidden
  // with display:none). This is required so react-hook-form can keep
  // track of all field values across steps. If we unmount a step, RHF
  // would lose its data and the final submit would be missing fields.
  // ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .cef-page {
          min-height: 100vh;
          background: #f5f5f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .cef-container { width: 100%; max-width: 520px; }

        .cef-heading { text-align: center; margin-bottom: 2rem; }
        .cef-heading h1 {
          font-size: 1.75rem; font-weight: 700;
          color: #111; letter-spacing: -0.03em; margin: 0 0 0.3rem;
        }
        .cef-heading p { font-size: 0.85rem; color: #888; margin: 0; }

        /* ── Stepper ── */
        .cef-stepper {
          display: flex; align-items: flex-start;
          justify-content: center; margin-bottom: 1.75rem;
        }
        .cef-step { display: flex; flex-direction: column; align-items: center; }
        .cef-step-dot {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 600; border: 1.5px solid;
          transition: all 0.3s ease;
        }
        .cef-step-dot.done   { background: #111; border-color: #111; color: #fff; }
        .cef-step-dot.active { background: #fff; border-color: #111; color: #111; }
        .cef-step-dot.idle   { background: #fff; border-color: #d1d5db; color: #9ca3af; }

        .cef-step-label {
          font-size: 0.68rem; font-weight: 600; margin-top: 6px;
          text-transform: uppercase; letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }
        .cef-step-label.done   { color: #111; }
        .cef-step-label.active { color: #111; }
        .cef-step-label.idle   { color: #c4c4c4; }

        .cef-connector {
          width: 64px; height: 1px; margin: 16px 8px 0;
          transition: background 0.4s ease;
        }
        .cef-connector.done { background: #111; }
        .cef-connector.idle { background: #e5e7eb; }

        /* ── Card ── */
        .cef-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #e8e8e4; padding: 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .cef-step-header { margin-bottom: 1.25rem; }
        .cef-step-header h2 { font-size: 1rem; font-weight: 600; color: #111; margin: 0 0 0.2rem; }
        .cef-step-header p  { font-size: 0.8rem; color: #9ca3af; margin: 0; }
        .cef-divider { border: none; border-top: 1px solid #f0f0ec; margin: 0 0 1.25rem; }

        .cef-fields  { display: flex; flex-direction: column; gap: 1rem; }
        .cef-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* ── Buttons ── */
        .cef-actions {
          display: flex; justify-content: flex-end; gap: 0.75rem;
          margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid #f0f0ec;
        }
        .cef-btn-back {
          padding: 0.6rem 1.25rem; border-radius: 10px;
          border: 1px solid #e5e7eb; background: #fff; color: #6b7280;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem; font-weight: 500; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .cef-btn-back:hover { background: #f9f9f7; color: #111; }

        .cef-btn-primary {
          padding: 0.6rem 1.5rem; border-radius: 10px;
          border: none; background: #111; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cef-btn-primary:hover:not(:disabled) { background: #333; }
        .cef-btn-primary:active:not(:disabled) { transform: scale(0.97); }
        .cef-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Progress bar ── */
        .cef-progress-track {
          height: 3px; background: #f0f0ec;
          border-radius: 99px; margin-top: 1.5rem; overflow: hidden;
        }
        .cef-progress-fill {
          height: 100%; background: #111;
          border-radius: 99px; transition: width 0.4s ease;
        }

        @keyframes cef-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cef-panel { animation: cef-fade 0.25s ease both; }
      `}</style>

      <div className="cef-page">
        <div className="cef-container">

          {/* ── Page heading ── */}
          <div className="cef-heading">
            <h1>Create an Event</h1>
            <p>Fill in three quick steps to publish your event</p>
          </div>

          {/* ── Step indicators ── */}
          <div className="cef-stepper">
            {STEPS.map((step, index) => {
              const state =
                index < currentStep ? "done" :
                index === currentStep ? "active" : "idle";
              return (
                <div key={step.number} style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className="cef-step">
                    <div className={`cef-step-dot ${state}`}>
                      {state === "done" ? "✓" : step.number}
                    </div>
                    <span className={`cef-step-label ${state}`}>{step.label}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`cef-connector ${index < currentStep ? "done" : "idle"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Form card ── */}
          <div className="cef-card">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* ─── STEP 1 — Basic info ─── */}
              <div style={{ display: currentStep === 0 ? "block" : "none" }} className="cef-panel">
                <div className="cef-step-header">
                  <h2>Event Details</h2>
                  <p>What, when, where and how much?</p>
                </div>
                <hr className="cef-divider" />
                <div className="cef-fields">
                  <Input
                    label="Event Name"
                    placeholder="e.g. Sunburn Festival 2025"
                    {...register("eventName", { required: "Event name is required" })}
                    error={errors.eventName}
                  />
                  <div className="cef-two-col">
                    <Input
                      type="date"
                      label="Event Date"
                      {...register("eventDate", { required: "Event date is required",min: { value: new Date().toISOString().split("T")[0], message: "Event date must be today or later" } })}
                      error={errors.eventDate}
                    />
                    <Input
                      type="time"
                      label="Event Time"
                      {...register("eventTime", { required: "Event time is required" })}
                      error={errors.eventTime}
                    />
                  </div>
                  <Input
                    label="Venue"
                    placeholder="e.g. NSCI Dome, Mumbai"
                    {...register("venue", { required: "Venue is required" })}
                    error={errors.venue}
                  />
                  <div className="cef-two-col">
                    <Input
                      type="number"
                      label="Price (₹)"
                      placeholder="0"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be 0 or more" },
                      })}
                      error={errors.price}
                    />
                    <Input
                      type="number"
                      label="Total Tickets"
                      placeholder="100"
                      {...register("totalSeats", {
                        required: "Total tickets is required",
                        min: { value: 1, message: "At least 1 ticket required" },
                      })}
                      error={errors.totalSeats}
                    />
                  </div>
                </div>
              </div>

              {/* ─── STEP 2 — Cover photo ─── */}
              <div style={{ display: currentStep === 1 ? "block" : "none" }} className="cef-panel">
                <div className="cef-step-header">
                  <h2>Event Photo</h2>
                  <p>Upload a cover image that grabs attention</p>
                </div>
                <hr className="cef-divider" />
                <ImageInput
                  height="300px"
                  label="Background Image"
                  accept="image/*"
                  {...register("backgroundImage", { required: "A cover image is required" })}
                  error={errors.backgroundImage}
                />
              </div>

              {/* ─── STEP 3 — Description ─── */}
              <div style={{ display: currentStep === 2 ? "block" : "none" }} className="cef-panel">
                <div className="cef-step-header">
                  <h2>Event Description</h2>
                  <p>Write a short description to attract attendees</p>
                </div>
                <hr className="cef-divider" />
                <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required", minLength: { value: 30, message: "Description must be at least 10 characters" } }} // You can add RHF validation here!
                        render={({ field, fieldState }) => (
                            <div>
                              <DescriptionForm 
                                value={field.value} 
                                onChange={field.onChange} 
                              />
                              
                              {/* If there is an error, show it in red below the editor */}
                              {fieldState.error && (
                                <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                      />
              </div>

              {/* ── Navigation buttons ── */}
              <div className="cef-actions">
                {!isFirstStep && (
                  <button type="button" className="cef-btn-back" onClick={handleBack}>
                    ← Back
                  </button>
                )}
                {!isLastStep ? (
                  <button type="button" className="cef-btn-primary" onClick={handleNext}>
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="cef-btn-primary"
                    disabled={createEventMutation.isPending}
                  >
                    {createEventMutation.isPending ? "Creating…" : "Create Event"}
                  </button>
                )}
              </div>
            </form>

            {/* Progress bar fills across steps */}
            <div className="cef-progress-track">
              <div
                className="cef-progress-fill"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Full-screen loading overlay while API call is in flight */}
      {createEventMutation.isPending && <Loader opacity="0.5" />}
    </>
  );
}

export default CreateEventForm;