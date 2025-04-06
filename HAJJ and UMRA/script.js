document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    alert("Thank you! Your submission has been received.");
});
const testimonials = document.querySelectorAll(".testimonial");

testimonials.forEach(testimonial => {
    testimonial.addEventListener("mouseenter", () => {
        testimonial.style.backgroundColor = "#f0f8ff";
    });

    testimonial.addEventListener("mouseleave", () => {
        testimonial.style.backgroundColor = "transparent";
    });
});