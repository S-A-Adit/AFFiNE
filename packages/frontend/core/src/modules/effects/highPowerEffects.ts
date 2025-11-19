// Internal flags for managing high-power features *requests*
let _manualOverrideLow = false;
let _thermalTriggeredLow = false;
let _batteryTriggeredLow = false;

// Internal flags for managing high-power features *actual state*
// These will be derived from the above request flags
let _liveRendering = true;
let _expensiveAnimations = true;
let _renderQuality = 'high'; // 'high', 'low'

// Internal state for battery monitoring
let _batteryManager = null; // Store battery manager instance

const _applySettings = (source = 'unknown') => {
  const isHighPower = !(_manualOverrideLow || _thermalTriggeredLow || _batteryTriggeredLow);

  _liveRendering = isHighPower;
  _expensiveAnimations = isHighPower; // Apply to expensiveAnimations as well
  _renderQuality = isHighPower ? 'high' : 'low';

  if (typeof globalThis.APP_SETTINGS === 'object' && globalThis.APP_SETTINGS !== null) {
    globalThis.APP_SETTINGS.liveRendering = _liveRendering;
    // Assuming APP_SETTINGS can also manage other rendering aspects.
    // This is a placeholder for actual integration with a render quality setting.
    globalThis.APP_SETTINGS.renderQuality = _renderQuality;
    // If APP_SETTINGS also has expensiveAnimations, it would be set here.
    // globalThis.APP_SETTINGS.expensiveAnimations = _expensiveAnimations;
  }
  // For flags not directly in globalThis.APP_SETTINGS, they would be used internally
  // by modules consuming these settings (e.g., an animation module checking _expensiveAnimations).
  // For this exercise, we are just setting the internal flag.
  console.log(`Settings updated by ${source}: Live rendering=${_liveRendering}, Expensive animations=${_expensiveAnimations}, Render quality=${_renderQuality}.`);
};

// Initialize settings based on default state
_applySettings('initialization');


/**
 * Disables high-power features to reduce system load.
 * This is a manual override and takes precedence over environmental factors.
 */
export const disableHighPowerFeatures = () => {
  _manualOverrideLow = true;
  _thermalTriggeredLow = false; // Manual override clears environmental triggers
  _batteryTriggeredLow = false; // Manual override clears environmental triggers
  _applySettings('manual_disable');
  console.log('High-power features manually disabled.');
};

/**
 * Enables high-power features, reverting to default settings.
 * This clears any manual override and allows environmental factors (thermal, battery)
 * to potentially reduce load again if their conditions are met.
 */
export const enableHighPowerFeatures = () => {
  _manualOverrideLow = false;
  // Clear all environmental triggers when manually enabling high-power features
  _thermalTriggeredLow = false;
  _batteryTriggeredLow = false;
  _applySettings('manual_enable');
  console.log('High-power features manually enabled.');
};

/**
 * Reduces load based on the thermal state of the device.
 * @param {('nominal'|'fair'|'serious'|'critical')} state - The current thermal state.
 */
export const reduceLoadForThermalState = (state) => {
  if (_manualOverrideLow) {
    console.log(`Thermal state '${state}' detected, but manual override is active. No changes from thermal state.`);
    return;
  }

  const shouldBeLow = (state === 'serious' || state === 'critical');
  const changed = _thermalTriggeredLow !== shouldBeLow;

  if (changed) {
    _thermalTriggeredLow = shouldBeLow;
    _applySettings('thermal');
    if (shouldBeLow) {
      console.warn(`Thermal state '${state}' detected. Reducing load.`);
    } else {
      console.log(`Thermal state '${state}' improved. Reverting thermal load reduction.`);
    }
  }
};

const _handleBatteryChange = () => {
  if (!_batteryManager) {
    return;
  }

  if (_manualOverrideLow) {
    console.log('Battery status changed, but manual override is active. No changes from battery state.');
    return;
  }

  // Low power if not charging, or if battery is low (e.g., <= 20%)
  const shouldBeLow = !_batteryManager.charging || _batteryManager.level <= 0.2;
  const changed = _batteryTriggeredLow !== shouldBeLow;

  if (changed) {
    _batteryTriggeredLow = shouldBeLow;
    _applySettings('battery');
    if (shouldBeLow) {
      console.warn(`Battery state: Discharging or level is low. Reducing load to save battery.`);
    } else {
      console.log(`Battery state: Charging and level is sufficient. Reverting battery load reduction.`);
    }
  }
};

/**
 * Initializes power management by setting up battery status monitoring.
 * This function should be called once when the application starts.
 */
export const initPowerManagement = () => {
  if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      _batteryManager = battery;
      _batteryManager.addEventListener('chargingchange', _handleBatteryChange);
      _batteryManager.addEventListener('levelchange', _handleBatteryChange);

      // Set initial state
      _handleBatteryChange();
      console.log('Battery monitoring initialized.');
    }).catch(err => {
      console.error('Failed to initialize battery monitoring:', err);
    });
  } else {
    console.warn('Battery Status API not supported in this environment or browser. Automatic battery-based power reduction will not be active.');
  }
};
