import React, {useState, useCallback, useRef} from 'react';

function TwelveHourClock() {
    const inputRef = useRef<AntdInput>(null);
    const defaultValue = '2 5,7,18 * * SUN';
    const [value, setValue] = useState(defaultValue);
    const customSetValue = useCallback(
      (newValue: string) => {
        setValue(newValue)
        inputRef.current?.setValue(newValue)
      },
      [inputRef]
    )
    const [error, onError] = useState<CronError>()
  
    return (
      <div>
        <p>Clock format: &quot;12-hour-clock&quot;</p>
        <p>Default value: {defaultValue}</p>
        <p>Value: {value}</p>
        <p>Error: {error ? error.description : 'undefined'}</p>
  
        <AntdInput
          ref={inputRef}
          onBlur={(event) => {
            setValue(event.target.value)
          }}
        />
  
        <Divider>OR</Divider>
  
        <Cron
          value={value}
          setValue={customSetValue}
          onError={onError}
          clockFormat='12-hour-clock'
        />
      </div>
    )
  }