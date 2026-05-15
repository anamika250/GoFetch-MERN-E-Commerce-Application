import axios from "../utils/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";

function Contactus() {
  const [form, setform] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setloading] = useState(false);

  // HANDLE CHANGE

  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // VALIDATION

  const validate = () => {
    if (!form.name.trim()) {
      return "Name is required";
    }

    if (!form.email) {
      return "Email is required";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      return "Invalid email";
    }

    if (!form.phone) {
      return "Phone is required";
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      return "Phone must be 10 digits";
    }

    if (!form.message.trim()) {
      return "Message cannot be empty";
    }

    return null;
  };

  // SUBMIT

  async function handlesubmit(e) {
    e.preventDefault();

    const err = validate();

    if (err) {
      return toast.error(err);
    }

    try {
      setloading(true);

      const res = await axios.post("/api/contactus", form);

      if (res.data.code === 1) {
        toast.success(res.data.msg || "Message sent");

        setform({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(res.data.msg || "Failed to send");
      }
    } catch (e) {
      toast.error("Error: " + e.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="contact-page">
        {/* LEFT SIDE */}

        <div className="contact-left">
          <div className="contact-overlay">
            <span className="contact-badge">Contact GoFetch</span>

            <h1>
              We would love
              <br />
              to hear from you
            </h1>

            <p>
              Questions, feedback or support? Reach out to our team anytime.
            </p>

            {/* CONTACT INFO */}

            <div className="contact-info">
              <div className="contact-info-item">📍 Punjab, India</div>

              <div className="contact-info-item">📧 gofetch783@gmail.com</div>

              <div className="contact-info-item">📞 +91 9876543210</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="contact-right">
          <div className="contact-card">
            <h2>Contact Us</h2>

            <p className="contact-subtitle">Send us your message ✨</p>

            <form onSubmit={handlesubmit}>
              {/* NAME */}

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handlechange}
                />
              </div>

              {/* EMAIL */}

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handlechange}
                />
              </div>

              {/* PHONE */}

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handlechange}
                />
              </div>

              {/* MESSAGE */}

              <div className="input-group">
                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handlechange}
                />
              </div>

              {/* BUTTON */}

              <button type="submit" className="contact-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
