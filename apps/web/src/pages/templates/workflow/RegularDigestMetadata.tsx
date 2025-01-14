import { Controller, useFormContext } from 'react-hook-form';
import { Group } from '@mantine/core';
import { DigestTypeEnum } from '@novu/shared';

import { colors, Input } from '../../../design-system';
import { inputStyles } from '../../../design-system/config/inputs.styles';
import { IntervalSelect } from './digest/IntervalSelect';
import { BackOffFields } from './digest/BackOffFields';

const amountDefaultValue = '5';

export const RegularDigestMetadata = ({ index, readonly }: { index: number; readonly: boolean }) => {
  const {
    control,
    formState: { errors, isSubmitted },
    watch,
    setValue,
  } = useFormContext();
  const showErrors = isSubmitted && errors?.steps;
  const amountFieldName = `steps.${index}.digestMetadata.${DigestTypeEnum.REGULAR}.amount`;

  return (
    <>
      <Group spacing={8} sx={{ color: colors.B60 }}>
        <span>digest events for</span>
        <Controller
          control={control}
          name={amountFieldName}
          defaultValue={amountDefaultValue}
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                value={field.value || ''}
                error={showErrors && fieldState.error?.message}
                min={0}
                max={100}
                type="number"
                data-test-id="time-amount"
                placeholder="0"
                disabled={readonly}
                styles={(theme) => ({
                  ...inputStyles(theme),
                  input: {
                    textAlign: 'center',
                    ...inputStyles(theme).input,
                    minHeight: '30px',
                    margin: 0,
                    height: 30,
                    lineHeight: '32px',
                  },
                })}
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setValue(amountFieldName, amountDefaultValue);
                  }
                  field.onBlur();
                }}
              />
            );
          }}
        />
        <div
          style={{
            width: '90px',
            height: 30,
          }}
        >
          <IntervalSelect
            readonly={readonly}
            control={control}
            name={`steps.${index}.digestMetadata.${DigestTypeEnum.REGULAR}.unit`}
            showErrors={showErrors}
          />
        </div>
        <span>before send</span>
      </Group>
      <BackOffFields index={index} control={control} readonly={readonly} />
    </>
  );
};
