// Default hole sizes based on Z-Clip type
const defaultHoleSizes = {
  "MF625": "0.203",
  "MF375": "0.203",
  "MF250": "0.203",
  "MFSTR-0375": "0.250",
  "MFSTR-050": "0.250",
  "MFSTR-075": "0.250"
};

const MF_HOLE_OPTIONS = ["0.1875"];
const MFSTR_HOLE_OPTIONS = ["0.3125"];

const base_material = {
  "MF250": {
    "6": "2.16",
    "12": "4.32",
    "18": "6.48",
    "24": "8.09",
    "30": "10.12",
    "36": "12.14",
    "42": "13.36",
    "48": "15.27",
    "54": "17.18",
    "60": "18.13",
    "66": "19.95",
    "72": "21.76",
    "78": "22.26",
    "84": "23.97",
    "90": "25.68",
    "96": "24.83",
    "102": "26.38",
    "108": "27.93",
    "114": "26.95",
    "120": "28.37",
    "126": "29.78",
    "132": "28.75",
    "138": "30.06",
    "144": "30.96"
  },
  "MF375": {
    "6": "1.81",
    "12": "3.62",
    "18": "5.44",
    "24": "6.89",
    "30": "8.62",
    "36": "10.34",
    "42": "11.52",
    "48": "13.17",
    "54": "14.82",
    "60": "15.81",
    "66": "17.39",
    "72": "18.97",
    "78": "19.63",
    "84": "21.14",
    "90": "22.65",
    "96": "22.30",
    "102": "23.69",
    "108": "25.09",
    "114": "24.58",
    "120": "25.87",
    "126": "27.17",
    "132": "26.57",
    "138": "27.78",
    "144": "28.67"
  },
  "MF625": {
    "6": "1.81",
    "12": "3.62",
    "18": "5.43",
    "24": "6.90",
    "30": "8.63",
    "36": "10.35",
    "42": "11.53",
    "48": "13.17",
    "54": "14.82",
    "60": "15.82",
    "66": "17.40",
    "72": "18.98",
    "78": "19.62",
    "84": "21.13",
    "90": "22.64",
    "96": "22.29",
    "102": "23.69",
    "108": "25.08",
    "114": "24.58",
    "120": "25.88",
    "126": "27.17",
    "132": "26.57",
    "138": "27.77",
    "144": "28.67"
  },
  "MFSTR-0375": {
    "6": "3.89",
    "12": "7.78",
    "18": "11.68",
    "24": "14.92",
    "30": "18.65",
    "36": "22.38",
    "42": "26.11",
    "48": "29.84",
    "54": "32.22",
    "60": "34.43",
    "66": "37.87",
    "72": "41.31",
    "78": "43.10",
    "84": "46.41",
    "90": "49.73",
    "96": "53.04",
    "102": "56.36",
    "108": "59.68",
    "114": "60.74",
    "120": "63.94",
    "126": "67.13",
    "132": "70.33",
    "138": "70.99",
    "144": "74.08"
  },
  "MFSTR-050": {
    "6": "2.87",
    "12": "5.74",
    "18": "8.61",
    "24": "10.96",
    "30": "13.70",
    "36": "16.44",
    "42": "19.18",
    "48": "20.52",
    "54": "22.60",
    "60": "25.11",
    "66": "27.63",
    "72": "28.93",
    "78": "31.34",
    "84": "33.75",
    "90": "36.16",
    "96": "38.57",
    "102": "39.41",
    "108": "41.73",
    "114": "44.05",
    "120": "46.36",
    "126": "48.68",
    "132": "49.11",
    "138": "51.34",
    "144": "53.58"
  },
  "MFSTR-075": {
    "6": "5.85",
    "12": "11.71",
    "18": "17.56",
    "24": "22.44",
    "30": "28.05",
    "36": "33.65",
    "42": "39.26",
    "48": "43.96",
    "54": "48.46",
    "60": "53.85",
    "66": "59.23",
    "72": "62.13",
    "78": "67.31",
    "84": "72.49",
    "90": "74.79",
    "96": "79.77",
    "102": "84.76",
    "108": "89.75",
    "114": "91.35",
    "120": "96.16",
    "126": "100.96",
    "132": "103.92",
    "138": "108.64",
    "144": "113.36"
  }
};

const cut_time = {
  "MF625": "1",
  "MF375": "1",
  "MF250": "1",
  "MFSTR-0375": "1",
  "MFSTR-050": "1",
  "MFSTR-075": "1"
}

const tier_setup = [
  { max: 19, price: 20 },
  { max: 39, price: 18 },
  { max: 79, price: 12 },
  { max: 159, price: 6 },
  { max: Infinity, price: 2 }
];

let punch_time = 7;
let setup_time = 20;
let labor_rate = 205;
let labor_rate_per_min = labor_rate / 60;
let labor_rate_per_sec = labor_rate / 3600;

function showSupportModal(details) {
  // Create modal elements
  document.body.style.overflow = 'hidden';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  // Prepare Email Data
  const subject = encodeURIComponent(`Custom Quote Request: ${details.type}`);
  const body = encodeURIComponent(`I am interested in a custom configuration:\n- Type: ${details.type}\n- Length: ${details.len}"\n- Holes: ${details.holes}\n\nPlease contact me with details.`);
  const mailto = `mailto:support@monarchmetal.com?subject=${subject}&body=${body}`;

  overlay.innerHTML = `
    <div class="modal-content">
      <h2>Custom Quote Required</h2>
      <p>This configuration exceeds our standard punch patterns. Our team can still manufacture this, but we need to provide a custom quote.</p>
      <div class="modal-btns">
        <a href="${mailto}" class="modal-btn btn-email">Email Configuration to Support</a>
        <a href="tel:6317503000" class="modal-btn btn-call">Call (631) 750-3000</a>
        <button class="modal-btn btn-close" id="closeModal">Back to Editor</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close logic
  document.getElementById('closeModal').onclick = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
}

function checkHits(z_type, length, hole_amount) {
  if (hole_amount === 0) {
    return 0;
  }

  const length_hits = length > 120 ? 2 : 1;
  let limitExceeded = false;
  let holes_hit = 0;

  if (["MF625", "MF375", "MF250"].includes(z_type)) {
    holes_hit = Math.ceil((hole_amount + 1) / 18);

    // Optional: Cap at 150 holes as requested
    if (hole_amount > 150) {
      holes_hit = 9; // 150 / 18 rounded up is 9
    }
    // else limitExceeded = true; CUSTOMER FACING BLOCKING MODAL FOR EXCESSIVE HOLE AMOUNTS
  }

  else if (["MFSTR-050", "MFSTR-0375", "MFSTR-075"].includes(z_type)) {
    holes_hit = Math.ceil((hole_amount + 1) / 8);

    if (hole_amount > 150) {
      holes_hit = 19; // 150 / 8 rounded up is 9
    }
    // else limitExceeded = true; CUSTOMER FACING BLOCKING MODAL FOR EXCESSIVE HOLE AMOUNTS
  }

  console.log(`Z-Clip Type: ${z_type}`);
  console.log(`Length: ${length}"`);
  console.log(`Hole Amount: ${hole_amount}`);
  console.log(`Length hits: ${length_hits}`);
  console.log(`Hole hits: ${holes_hit}`);

  if (limitExceeded) {
    showSupportModal({ type: z_type, len: length, holes: hole_amount });
    return 0;
  }

  // 3. Return the Greater of the two
  return Math.max(length_hits, holes_hit);
}

function updateDefaultHoleSizeText(choiceBlock) {
  const zclipSelect = choiceBlock.querySelector('select[name="zclip"]');
  const holeSizeSelect = choiceBlock.querySelector('select[name="hole_size"]');

  if (!zclipSelect || !holeSizeSelect) return;

  const zclipType = zclipSelect.value;
  const defaultSize = defaultHoleSizes[zclipType];

  // Choose the strict list based on the product prefix
  let relevantSizes = zclipType.startsWith("MFSTR") ? MFSTR_HOLE_OPTIONS : MF_HOLE_OPTIONS;

  let optionsHTML = '';
  let selectedSize = holeSizeSelect.value;

  if (zclipType && defaultSize) {
    // 1. Always start with the standard stock size as "Default"
    optionsHTML += `<option value="default" selected>Default - ${defaultSize}"</option>`;

    // 2. Add the single specific alternative option
    relevantSizes.forEach(size => {
      optionsHTML += `<option value="${size}">${size}"</option>`;
    });
  } else {
    // Fallback if no clip is selected
    optionsHTML += '<option value="default" selected>Default</option>';
  }

  holeSizeSelect.innerHTML = optionsHTML;

  // Preserve selection if the user is just toggling options
  if (selectedSize !== 'default' && holeSizeSelect.querySelector(`option[value="${selectedSize}"]`)) {
    holeSizeSelect.value = selectedSize;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById('helpToggle');
  const tooltip = document.getElementById('helpTooltip');

  helpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltip.classList.toggle('hidden2');
  });

  // Close tooltip if clicking anywhere else on the screen
  document.addEventListener('click', () => {
    tooltip.classList.add('hidden2');
  });
});

// When the DOM is fully loaded, initialize event listeners and form validation
document.addEventListener("DOMContentLoaded", () => {
  const userChoiceContainer = document.getElementById("user_choice_container");
  const addChoiceBtn = document.getElementById("add_choice_btn");
  const form = document.getElementById("customerForm");

  const clearAllBtn = document.getElementById("clear_all");

  clearAllBtn.addEventListener("click", () => {
    location.reload();
  });

  const initialChoiceBlock = document.querySelector(".user_choice1");

  // Initial setup call to populate the first hole size dropdown
  if (initialChoiceBlock) {
    updateDefaultHoleSizeText(initialChoiceBlock);
  }

  // --- NEW EVENT DELEGATION FOR Z-CLIP CHANGE ---
  // This listener handles changes to the Z Clip dropdown dynamically
  userChoiceContainer.addEventListener("change", (e) => {
    if (e.target.name === "zclip") {
      const choiceBlock = e.target.closest(".user_choice1");
      updateDefaultHoleSizeText(choiceBlock);
    }
  });
  // ---------------------------------------------

  // Add event listeners for buttons inside user_choice dynamically (event delegation)
  userChoiceContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("clear-btn")) {
      clearUserChoice(e.target);
    }
    else if (e.target.classList.contains("remove-btn")) {
      removeUserChoice(e.target);
    }

    //UNCOMMENT THIS IF YOU WANT TO ENABLE UNIQUE PROJECT NAME
    // else if (e.target.classList.contains("change-btn")) {
    //   changeProjectName(e.target);
    // }

  });

  // Add new user choice options
  addChoiceBtn.addEventListener("click", () => {
    addUserChoice();
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const userChoices = userChoiceContainer.querySelectorAll(".user_choice1");

    userChoices.forEach(choice => {
      const lengthInput = choice.querySelector('input[name="len"]');
      const lenVal = parseFloat(lengthInput.value);

      if (!isIncrement(lenVal, 1.5, 0.125)) {
        isValid = false;
        lengthInput.setCustomValidity("Length must be in 0.125\" increments starting from 1.5\".");
        lengthInput.reportValidity();
      }

      else {
        lengthInput.setCustomValidity("");
      }

      const spaceInput = choice.querySelector('input[name="space"]');
      const spaceVal = parseFloat(spaceInput.value);

      if (!isIncrement(spaceVal, 1, 0.5)) {
        isValid = false;
        spaceInput.setCustomValidity("Spacing must be in 0.5\" increments starting from 1\".");
        spaceInput.reportValidity();
      }

      else {
        spaceInput.setCustomValidity("");
      }

      // Validate length > spacing (only flag one field)
      if (!isNaN(lenVal) && !isNaN(spaceVal)) {
        if (lenVal <= spaceVal) {
          isValid = false;
          // Flag spacing as the dependent variable
          spaceInput.setCustomValidity("Spacing must be smaller than length.");
          spaceInput.reportValidity();
          lengthInput.setCustomValidity("");
        }

        else {
          lengthInput.setCustomValidity("");
          spaceInput.setCustomValidity("");
        }
      }
    });

    if (!isValid) return;

    const data = gatherFormData();
    if (data) calculateOrder(data.choices); // Pass only choices to the new calculation logic
  });

  // Live validation for length > spacing
  userChoiceContainer.addEventListener("input", (e) => {
    const choice = e.target.closest(".user_choice1");
    if (!choice) return;

    const lengthInput = choice.querySelector('input[name="len"]');
    const lenVal = parseFloat(lengthInput.value);

    const spaceInput = choice.querySelector('input[name="space"]');
    const spaceVal = parseFloat(spaceInput.value);

    if (!isNaN(lenVal) && !isNaN(spaceVal)) {
      if (lenVal <= spaceVal) {
        // only flag the field being changed
        if (e.target === lengthInput) {
          lengthInput.setCustomValidity("Length must be greater than spacing.");
          spaceInput.setCustomValidity("");
          lengthInput.reportValidity();
        }

        else {
          spaceInput.setCustomValidity("Spacing must be smaller than length.");
          lengthInput.setCustomValidity("");
          spaceInput.reportValidity();
        }
      }

      else {
        lengthInput.setCustomValidity("");
        spaceInput.setCustomValidity("");
      }
    }
  });

  // Helper function to check increment step
  function isIncrement(value, base, step) {
    const remainder = (value - base) % step;
    return Math.abs(remainder) < 1e-8;
  }

  // Clear user choice inputs
  function clearUserChoice(button) {
    const block = button.closest(".user_choice1");
    if (!block) return;

    block.querySelectorAll("input, select, textarea").forEach(el => { // Added textarea
      if (el.tagName === "SELECT") {
        el.selectedIndex = 0;
      }

      else {
        el.value = "";
        el.setCustomValidity("");
      }
    });

    // Rerun the update to reset "Default" text if clearing Z-Clip choice
    updateDefaultHoleSizeText(block);
  }

  // Remove extra Z Clip options
  function removeUserChoice(button) {
    const block = button.closest(".user_choice1");
    if (!block) return;

    const allChoices = userChoiceContainer.querySelectorAll(".user_choice1");
    if (allChoices.length > 1) {
      block.remove();
    }

    else {
      alert("At least one Z Clip option must remain.");
    }
  }

  // Add new user choice block
  let choiceCount = 0;

  function addUserChoice() {
    choiceCount++;
    // We don't need holeSizeGroupName, but keeping choiceCount for IDs

    const newChoice = document.createElement("div");
    newChoice.classList.add("user_choice1");
    newChoice.innerHTML = `
    <hr/>
      <div class="input-row">
         <div class="input-group">
              <label for="zclip_${choiceCount}">Z Clip Options <span class="req">*</span></label>
              <select id="zclip_${choiceCount}" name="zclip" class="zclip" required>
                <option value="" selected disabled>Choose An Option</option>
                <option value="MF250">MF250</option>
                <option value="MF375">MF375</option>
                <option value="MF625">MF625</option>
                <option value="MFSTR-050">MFSTR-050</option>
                <option value="MFSTR-075">MFSTR-075</option>
                <option value="MFSTR-0375">MFSTR-0375</option>
              </select>
            </div>

      </div>

      <div class="input-row">

            <div class="input-group">
                <label for="hole_size_${choiceCount}">Hole Size <span class="req">*</span></label>

                <select id="hole_size_${choiceCount}" name="hole_size" class="hole_size" required>
                    </select>
            </div>

             <div class="input-group">
              <label for="quant_${choiceCount}">Quantity <span class="req">*</span></label>
              <input type="number" id="quant_${choiceCount}" name="quant" min="1" step="1" required />
            </div>

          </div>

      <div class="input-row">

            <div class="input-group">
              <div class="label-row">
                <label for="len_${choiceCount}" class="tooltip" data-tooltip='Spacing must be in 0.125" increments'>
                  Length <span class="span2">(Inches)</span>
                  <span class="req">*</span>
                </label>

                <button type="button" class="toggle-btn tooltip"
                  data-tooltip='Click here to account for the saw cut thickness' aria-pressed="false" id="toggle-btn_${choiceCount}">
                  Optimize Length
                </button>
              </div>

              <input type="number" name="len" min="1.5" max="144" step="0.125" placeholder='Choose from 1.5" to 144"'
                id="len_${choiceCount}" required />

            </div>

            <div class="input-group">
              <label for="space_${choiceCount}" class="tooltip" data-tooltip='Spacing must be in 0.5" increment'>
                Spacing <span class="span2">(Inches)</span><span class="req">*</span>
              </label>
              <input type="number" name="space" min="0" placeholder='Min. 0"' step="0.5" required id="space_${choiceCount}" />
            </div>

          </div>

      <div id="box"></div>

      <div class="input-row">
            <div class="input-group">
              <label for="notes">Additional Notes <span class="span2">(Max 130 characters)</span></label>
              <textarea id="notes" name="notes" rows="3" cols="30" maxlength="130"
                placeholder="e.g., Special packaging, rush order, non-standard finish, etc."></textarea>
            </div>
          </div>


      <div class="input-row buttons">
        <button type="button" class="clear-btn">Clear</button>
        <button type="button" class="remove-btn">Remove This Option</button>
      </div>
    `;

    userChoiceContainer.appendChild(newChoice);

    // Initial update call is crucial for populating the empty select element
    updateDefaultHoleSizeText(newChoice);
  }

  function gatherFormData() {
    const companyName = form.querySelector("#comp_name").value.trim();
    const projectName = form.querySelector("#proj_name").value.trim();

    const choices = [];
    userChoiceContainer.querySelectorAll(".user_choice1").forEach(choice => {
      const zclipSelect = choice.querySelector('select[name="zclip"]');
      const holeSizeSelect = choice.querySelector('select[name="hole_size"]');

      const zclip = zclipSelect.value;
      let hole_size = holeSizeSelect.value;

      // *** LOGIC TO DEFAULT HOLE SIZE ON SUBMIT ***
      if (hole_size === "default") {
        hole_size = defaultHoleSizes[zclip] || "N/A";
      }
      // **********************************************

      const quantity = parseInt(choice.querySelector('input[name="quant"]').value, 10);
      const lengthInput = choice.querySelector('input[name="len"]');

      const rawOpt = lengthInput.dataset.optimizedValue;
      const length = rawOpt && !isNaN(parseFloat(rawOpt))
        ? parseFloat(rawOpt)
        : parseFloat(lengthInput.value);

      const spacing = parseFloat(choice.querySelector('input[name="space"]').value);
      const notes = choice.querySelector('textarea[name="notes"]').value.substring(0, 150); // Apply max length
      const toggleBtn = choice.querySelector('.toggle-btn');

      choices.push({
        zclip,
        hole_size, // Now the correct defaulted value
        quantity,
        length,
        spacing,
        notes,
        companyName,
        projectName,
        _toggleBtn: toggleBtn
      });
    });

    return { companyName, projectName, choices };
  }


});

// Reset individual inputs outside DOMContentLoaded
document.querySelectorAll(".reset-field").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input) input.value = "";
  });
});


/*CALCULATIONS*/

function computeHoleData(length, spacing) {
  if (!spacing || parseFloat(spacing) === 0) {
    return {
      hole_amount: 0,
      leadInForPiece: 0,
      leadIn: 0
    };
  }

  let holesBetween = Math.floor(length / spacing);

  if (Number.isInteger(length / spacing)) {
    holesBetween -= 1;
  }

  let hole_amount = holesBetween + 1;

  let totalLeadIn = length - (holesBetween * spacing);
  let leadInForPiece = totalLeadIn / 2;

  // enforce minimum lead-in of 0.5"
  if (leadInForPiece < 0.5) {
    leadInForPiece = 0.5;
    hole_amount -= 1;
  }

  // round lead-in to nearest 1/16"
  const roundTo = 1 / 16; // 0.0625
  leadInForPiece = Math.round(leadInForPiece / roundTo) * roundTo;
  totalLeadIn = leadInForPiece * 2;

  return {
    hole_amount,
    leadInForPiece,
    leadIn: totalLeadIn
  };
}

// Handle optimize button click
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (!btn) return;

  const choice = btn.closest(".user_choice1");
  if (!choice) return;

  const lengthInput = choice.querySelector('input[name="len"]');
  const currentValue = parseFloat(lengthInput.value) || 0;
  const isOptimized = btn.dataset.optimized === "true";

  if (currentValue === 144) {
    alert("Z-clip length cannot exceed 144 inches.");
    return; // stop further processing
  }

  // Toggle optimized state
  btn.dataset.optimized = (!isOptimized).toString();
  btn.classList.toggle("optimized-btn", !isOptimized);

  if (!isOptimized) {
    lengthInput.dataset.optimizedValue = String(currentValue + 0.125);
    console.log("Optimized value set:", lengthInput.dataset.optimizedValue);
  } else {
    lengthInput.removeAttribute("data-optimized-value");
    console.log("Optimized value cleared");
  }
});

// Handle manual input changes
document.addEventListener("input", (e) => {
  const input = e.target;
  if (input.name !== "len") return;

  const choice = input.closest(".user_choice1");
  if (!choice) return;

  if (input.dataset.optimizedValue) {
    input.removeAttribute("data-optimized-value"); // Correct DOM-safe way

    const toggleBtn = choice.querySelector(".toggle-btn");
    if (toggleBtn) {
      toggleBtn.dataset.optimized = "false";
      toggleBtn.classList.remove("optimized-btn");
    }

    console.log("Manual change detected — optimization cleared");
  }
});

function roundToSix(length) {
  return Math.ceil(length / 6) * 6;
}

function getTieredSetupPrice(quantity) {
  // Find the first tier where the quantity is less than or equal to the max
  const tier = tier_setup.find(t => quantity <= t.max);
  // Return the price of that tier (or the last one if not found)
  return tier ? tier.price : tier_setup[tier_setup.length - 1].price;
}

// Calculate Single Price (Now used for every choice)
// function calculatePrice(choices_data) {

//   console.log("Z CLIP PRICE CALCULATION BREAKDOWN");
//   const choice_info = [];

//   const { hole_amount, leadInForPiece } = computeHoleData(
//     choices_data.length,
//     choices_data.spacing
//   );

//   let quantity_of_hits = checkHits(choices_data.zclip, choices_data.length, hole_amount);

//   let hole_total_cost = ((punch_time * labor_rate_per_sec) + (setup_time * labor_rate_per_sec)) * quantity_of_hits;

//   hole_total_cost = hole_total_cost.toFixed(2);

//   console.log(`Hole Total Cost: $${hole_total_cost}`);
//   console.log(`Punch Rate: $${(punch_time * labor_rate_per_sec).toFixed(2)}`);
//   console.log(`Setup Rate: $${(setup_time * labor_rate_per_sec).toFixed(2)}`);

//   let rounded_to_six_length = roundToSix(choices_data.length);
//   console.log(`Length rounded to nearest 6 inches: ${rounded_to_six_length}"`);

//   let base_material_cost = 0;
//   const clip_type = choices_data.zclip; // e.g., "MFSTR-075"
//   const length_key = rounded_to_six_length.toString(); // e.g., "12"

//   // Check if the clip type exists, then check if the length exists within that type
//   if (base_material[clip_type] && base_material[clip_type][length_key]) {
//     base_material_cost = base_material[clip_type][length_key];
//     console.log(`Base Material Cost (${clip_type}): $${base_material_cost}`);
//   } else {
//     console.error(`Pricing not found for ${clip_type} at length ${length_key}`);
//   }

//   let single_cutting_labor = 0;
//   for (const key in cut_time) {
//     if (choices_data.zclip === key) {
//       single_cutting_labor = cut_time[key];
//       console.log(`Cutting Labor Time: ${single_cutting_labor}`);
//     }
//   }

//   let cutting_labor = single_cutting_labor * labor_rate_per_sec;

//   console.log(`Cutting Labor Rate: $${cutting_labor.toFixed(2)}`);

//   let single_z_price = parseFloat(base_material_cost) + parseFloat(single_cutting_labor) + parseFloat(hole_total_cost);
//   single_z_price = single_z_price.toFixed(2);

//   console.log(`Single Z-Clip Price: $${single_z_price}`);

//   let total_price = parseFloat(single_z_price) * parseFloat(choices_data.quantity);
//   total_price = total_price.toFixed(2);
//   console.log(`Total Z-Clip Price (for ${choices_data.quantity} pieces): $${total_price}`);

//   // // Part name
//   const custom_name = name_part(choices_data);

//   // // Logic for Additional Notes: 'Yes' if text is present, otherwise blank/undefined
//   const notes_status = choices_data.notes && choices_data.notes.trim().length > 0 ? "Yes" : "No";

//   choice_info.push({
//     "Company Name": capitalizeFirstLetter(choices_data.companyName),
//     "Project Name": capitalizeFirstLetter(choices_data.projectName),
//     "Custom Part Name": custom_name,
//     "Z Clip Type": choices_data.zclip,
//     "Lead In For Piece": parseFloat(leadInForPiece),
//     "Quantity": parseInt(choices_data.quantity),
//     "Length": parseFloat(choices_data.length),
//     "Spacing": parseFloat(choices_data.spacing),
//     "Hole Size": choices_data.hole_size, // Now the correct defaulted value
//     "Hole Amount": parseInt(hole_amount),
//     "Notes Status": notes_status,
//     "Additional Notes": choices_data.notes,
//     "Price per Z Clip": parseFloat(single_z_price),
//     "Total Z Clip Price": parseFloat(total_price)
//   });

//   console.log("\n");

//   return choice_info;
// }

// Calculate Single Price
function calculatePrice(choices_data) {
  console.log("Z CLIP PRICE CALCULATION BREAKDOWN");
  const choice_info = [];

  const { hole_amount, leadInForPiece } = computeHoleData(
    choices_data.length,
    choices_data.spacing
  );

  let quantity_of_hits = checkHits(choices_data.zclip, choices_data.length, hole_amount);

  let punch_cost_per_hit = (punch_time * labor_rate_per_sec);
  punch_cost_per_hit = punch_cost_per_hit.toFixed(2);

  let setup_cost_per_hole = getTieredSetupPrice(choices_data.quantity);

  console.log(`Initial Setup Time per Hole (in sec - from tiered pricing): $${setup_cost_per_hole}`);

  setup_cost_per_hole = setup_cost_per_hole * labor_rate_per_sec;
  setup_cost_per_hole = setup_cost_per_hole.toFixed(2);

  // Calculate Hole Labor Cost
  let hole_total_cost = ((punch_cost_per_hit * quantity_of_hits) + (setup_cost_per_hole * hole_amount));

  console.log(`Hole Total Cost: $${hole_total_cost.toFixed(2)}`);
  console.log(`Punch Rate (punch time * Labor Rate per Sec): $${punch_cost_per_hit}`);
  console.log(`Setup Rate (tiered setup rate * Labor Rate per Sec): $${setup_cost_per_hole}`);

  let rounded_to_six_length = roundToSix(choices_data.length);
  console.log(`Length rounded to nearest 6 inches: ${rounded_to_six_length}"`);

  // --- UPDATED LOOKUP LOGIC ---
  let base_material_cost = 0;
  const clip_type = choices_data.zclip; // e.g., "MFSTR-075"
  const length_key = rounded_to_six_length.toString(); // e.g., "12"

  // Check if the clip type exists, then check if the length exists within that type
  if (base_material[clip_type] && base_material[clip_type][length_key]) {
    base_material_cost = base_material[clip_type][length_key];
    console.log(`Base Material Cost (${clip_type}): $${base_material_cost}`);
  } else {
    console.error(`Pricing not found for ${clip_type} at length ${length_key}`);
  }
  // -----------------------------

  // Calculate Cutting Labor Cost
  // Using direct lookup instead of a loop for efficiency
  let single_cutting_labor_time = cut_time[choices_data.zclip] || 0;
  let cutting_labor_cost = parseFloat(single_cutting_labor_time) * labor_rate_per_sec;

  console.log(`Cutting Labor Time: ${single_cutting_labor_time}s`);
  console.log(`Cutting Labor Rate (Cutting Labor Time * Labor Rate per Sec): $${cutting_labor_cost.toFixed(2)}`);

  // Calculate Total Single Price
  // Note: We sum base_material_cost + cutting_labor_cost + hole_total_cost
  let single_z_price = parseFloat(base_material_cost) + cutting_labor_cost + hole_total_cost;
  let formatted_single_price = single_z_price.toFixed(2);

  console.log(`Single Z-Clip Price: $${formatted_single_price}`);

  let total_price = (single_z_price * parseFloat(choices_data.quantity)).toFixed(2);
  console.log(`Total Z-Clip Price (for ${choices_data.quantity} pieces): $${total_price}`);

  // Part name and notes logic
  const custom_name = name_part(choices_data);
  const notes_status = choices_data.notes && choices_data.notes.trim().length > 0 ? "Yes" : "No";

  choice_info.push({
    "Company Name": capitalizeFirstLetter(choices_data.companyName),
    "Project Name": capitalizeFirstLetter(choices_data.projectName),
    "Custom Part Name": custom_name,
    "Z Clip Type": choices_data.zclip,
    "Lead In For Piece": parseFloat(leadInForPiece),
    "Quantity": parseInt(choices_data.quantity),
    "Length": parseFloat(choices_data.length),
    "Spacing": parseFloat(choices_data.spacing),
    "Hole Size": choices_data.hole_size, 
    "Hole Amount": parseInt(hole_amount),
    "Notes Status": notes_status,
    "Additional Notes": choices_data.notes,
    "Price per Z Clip": parseFloat(formatted_single_price),
    "Total Z Clip Price": parseFloat(total_price)
  });

  console.log("\n");

  return choice_info;
}

function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return string; // Handle non-string input or empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Calculate total order price - MODIFIED TO SAFELY SUM NUMBERS (0)
function total_order(choices) {
  let total = 0;

  for (const item of choices) {
    let raw = item["Total Z Clip Price"];

    if (raw == null) continue; // skip missing

    // Check if it's a number (which is what calculatePrice returns now)
    if (typeof raw === "number") {
      total += raw;
      continue;
    }

    // Fallback for previous string format, though now it should be a number (0)
    const num = parseFloat(String(raw).replace(/[$,]/g, ""));
    if (!isNaN(num)) total += num;
  }

  return total;
}

//Function to calculate multi price and single price
function calculateOrder(choices) {
  const all_results = [];
  let grand_total = 0;

  // 1. Iterate over each choice and calculate price individually
  for (const item of choices) {
    const group_results = calculatePrice(item); // calculates for a single choice item
    all_results.push(...group_results); // push the resulting object(s)

    // 2. Sum the individual totals to get the grand total
    grand_total += total_order(group_results);
  }

  all_results.sort((a, b) => {
    const clipA = a["Z Clip Type"].toUpperCase();
    const clipB = b["Z Clip Type"].toUpperCase();
    if (clipA < clipB) return -1;
    if (clipA > clipB) return 1;
    return 0;
  });

  // Final step: print the full merged dataset
  print_results(all_results, formatPrice(grand_total));
  return grand_total;
}

//Naming part function
function name_part(choice) {
  // Determine the length to use for naming
  // If the toggle optimization was applied, subtract 0.125
  let lengthForName = choice.length;
  if (choice._toggleBtn?.dataset.optimized === "true") {
    lengthForName = parseFloat((choice.length - 0.125).toFixed(3));
  }

  // Start building the custom part name
  let custom_name = `CUS-${choice.zclip}-${lengthForName}`;

  // Append spacing info if > 0
  if (choice.spacing && parseFloat(choice.spacing) > 0) {
    custom_name += `H${choice.spacing}`;
  }

  // Append hole size info (which is the actual value, not "default", thanks to gatherFormData)
  if (choice.hole_size && choice.hole_size !== "default") {
    custom_name += `D${choice.hole_size}`;
  }

  return custom_name;
}


// Format price with commas and two decimals
function formatPrice(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

//Function to print the results
function print_results(results_array, grand_total) {

  const formatted = results_array.map(item => {
    const obj = { ...item };

    // Remove "Notes Status" if it's not 'Yes' (i.e., if it was undefined)
    if (obj["Notes Status"] === undefined) {
      delete obj["Notes Status"];
    }

    // Format pricing fields (which will all be $0.00 now)
    for (const key of ["Price per Z Clip", "Total Z Clip Price"]) {
      if (obj[key] != null && !String(obj[key]).startsWith('$')) {
        obj[key] = '$' + formatPrice(parseFloat(String(obj[key]).replace(/[$,]/g, "")));
      }
    }
    return obj;
  });

  const data = {
    price_per_group: grand_total, // grand_total is already formatted here
    choices_array: formatted
  };

  localStorage.setItem("calc_results", JSON.stringify(data));

  window.open("./html/calculation_results.html", "_blank");
}

//Add 0 spacing edge case