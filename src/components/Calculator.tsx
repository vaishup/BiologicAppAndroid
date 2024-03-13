import {useState, useEffect} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  HStack,
  Input,
  InputField,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {SvgXml} from 'react-native-svg';
import Icon from './IconPack';
import CustomButton from './Button';

interface CalculatorProps {
  onPress: () => void;
}

const flag_CA = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#d80027" d="M0 0v512h144l112-64 112 64h144V0H368L256 64 144 0Z"/><path fill="#eee" d="M144 0h224v512H144Z"/><path fill="#d80027" d="m301 289 44-22-22-11v-22l-45 22 23-44h-23l-22-34-22 33h-23l23 45-45-22v22l-22 11 45 22-12 23h45v33h22v-33h45z"/></g></svg>`;
const flag_SEN = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#ffda44" d="M144.8 0h222.4l32 260-32 252H144.8l-32.1-256z"/><path fill="#496e2d" d="M0 0h144.8v512H0z"/><path fill="#d80027" d="M367.2 0H512v512H367.2z"/><path fill="#496e2d" d="m256.1 167 22.1 68h71.5L292 277l22 68-57.8-42-57.9 42 22.1-68-57.8-42H234z"/></g></svg>`;

const Calculator: React.FC<CalculatorProps> = ({onPress}) => {
  const [AmountTxt_CAD, setAmountTxt_CAD] = useState('');
  const [AmountTxt_CFA, setAmountTxt_CFA] = useState('');

  const [CADCFA, setCADCFA] = useState(0);

  const formatAmount = (text: string | number) => {
    const amount = parseFloat(text.toString().replace(/,/g, ''));
    return isNaN(amount)
      ? '0.00'
      : amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fetchData = async () => {
    setCADCFA(445.15081);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <VStack backgroundColor="white" borderRadius={10} padding={20}>
      <Text size="sm">You Send Exactly</Text>
      <Input variant="outline" h={48} mt={2}>
        <InputField
          value={AmountTxt_CAD}
          onChangeText={text => {
            if (text === '') {
              setAmountTxt_CAD('');
              setAmountTxt_CFA('0.00');
              return;
            }
            const cleanedText = text.replace(/^0+(?!\.)/, '0');
            const regex = /^$|^\d+(\.\d{0,2})?$/;

            if (
              regex.test(cleanedText) &&
              parseFloat(cleanedText) < 10000000000
            ) {
              setAmountTxt_CAD(cleanedText);
              setAmountTxt_CFA(formatAmount(parseFloat(cleanedText) * CADCFA));
            }
          }}
          onFocus={() => {
            const amount = parseFloat(AmountTxt_CAD.replace(/,/g, ''));
            setAmountTxt_CAD(
              isNaN(amount) || amount === 0 ? '' : amount.toString(),
            );
          }}
          onBlur={() => setAmountTxt_CAD(formatAmount(AmountTxt_CAD))}
          placeholder="Amount"
          keyboardType="decimal-pad"
        />
        <InputSlot>
          <HStack px={10} space="xs" width={92}>
            <SvgXml xml={flag_CA} width={30} height={30} />
            <Text fontWeight="$semibold" size="lg" color="#898989">
              CAD
            </Text>
          </HStack>
        </InputSlot>
      </Input>

      <HStack space="xs" alignItems="center" mt={13}>
        <Icon type={'dollarSign'} size={15} />
        <Text size="sm">1 CAD = {CADCFA} CFA</Text>
      </HStack>

      <Text size="sm" mt={30}>
        Recipient Gets
      </Text>

      <Input variant="outline" h={48} mb={30} mt={2}>
        <InputField
          value={AmountTxt_CFA}
          onChangeText={text => {
            if (text === '') {
              setAmountTxt_CAD('0.00');
              setAmountTxt_CFA('');
              return;
            }
            const cleanedText = text.replace(/^0+(?!\.)/, '0');
            const regex = /^$|^\d+(\.\d{0,2})?$/;

            if (
              regex.test(cleanedText) &&
              parseFloat(cleanedText) < 10000000000000
            ) {
              setAmountTxt_CFA(cleanedText);
              setAmountTxt_CAD(formatAmount(parseFloat(cleanedText) / CADCFA));
            }
          }}
          onFocus={() => {
            const amount = parseFloat(AmountTxt_CFA.replace(/,/g, ''));
            setAmountTxt_CFA(
              isNaN(amount) || amount === 0 ? '' : amount.toString(),
            );
          }}
          onBlur={() => setAmountTxt_CFA(formatAmount(AmountTxt_CFA))}
          placeholder="Amount"
          keyboardType="decimal-pad"
        />
        <InputSlot>
          <HStack px={10} space="xs" width={92}>
            <SvgXml xml={flag_SEN} width={30} height={30} />
            <Text fontWeight="$semibold" size="lg" color="#898989">
              CFA
            </Text>
          </HStack>
        </InputSlot>
      </Input>

      <CustomButton
        text={'Send Remittance'}
        width={'100%'}
        action={() => console.log('Send Remittance')}
      />
    </VStack>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 30,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#3948AA',
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  inputText: {
    color: '#3948AA',
    ...Platform.select({
      ios: {
        marginBottom: 4,
      },
    }),
  },
});
