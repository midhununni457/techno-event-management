import { inter } from '@/components/ui/fonts';
import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { FormControl, Input } from '@chakra-ui/react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { StyledButton, StyledText, StyledBox } from '@/components/ui/StyledComponents';

const NavigationMenu = ({ orgId, eventId, navButton, state = null, setState = null }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('');
  const { eventDetails } = useContext(account);
  const menuItems = [
    ...[
      eventDetails.isShortlisting && router.asPath.endsWith('/participants')
        ? {
            name: 'Registrant Details',
            path: `/${orgId}/events/${eventId}/registrants`,
          }
        : {
            name: 'Participants Details',
            path: `/${orgId}/events/${eventId}/participants`,
          },
    ],
    {
      name: 'Participants Check-in Details',
      path: `/${orgId}/events/${eventId}/participants/check-in`,
    },
    {
      name: 'Participants Payment Status',
      path: `/${orgId}/events/${eventId}/paymentstatus`,
    },
    {
      name: 'Attributes Details',
      path: `/${orgId}/events/${eventId}/attributes`,
    },
    {
      name: 'Extras Details',
      path: `/${orgId}/events/${eventId}/extras`,
    },
  ];

  useEffect(() => {
    const path = router.asPath;
    const lastSegment = path.split('/').pop();

    const pageMap = {
      participants: 'Participants Details',
      'check-in': 'Participants Check-in Details',
      attributes: 'Attributes Details',
      extras: 'Extras Details',
    };

    setCurrentPage(pageMap[lastSegment] || 'Details');
  }, [router.asPath]);
  const { colorMode } = useColorMode();
  const commonButtons = (
    <div className="flex gap-4" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <StyledButton
        leftIcon={<ChevronLeftIcon />}
        colorScheme="gray"
        variant="solid"
        onClick={() => router.push(`/${orgId}/events/`)}
      >
        <StyledText>Back</StyledText>
      </StyledButton>
      <Menu>
        <MenuButton as={StyledButton} rightIcon={<ChevronDownIcon />}>
          <StyledText>{currentPage}</StyledText>
        </MenuButton>
        <MenuList
          sx={{
            bg: colorMode === 'light' ? '#F5F5F5' : '#1D1E23',
            borderColor: colorMode === 'light' ? '#EEEFF2' : '#101117',
            borderRadius: 'var(--8, 8px)',
            opacity: '1',
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              sx={{
                bg: colorMode === 'light' ? '#F5F5F5' : '#1D1E23',
                _hover: {
                  bg: colorMode === 'light' ? '#EEEFF2' : '#101117',
                },
                opacity: '1',
              }}
              onClick={() => router.push(item.path)}
            >
              <StyledText opacity="1">{item.name}</StyledText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );

  return (
    <StyledBox className="w-full space-y-4" mt="20px" flexDirection="column" width="100%">
      <StyledBox width="100%" flexDirection="row" justifyContent="space-between" mb="5" mt="2.5">
        {commonButtons}
        {navButton && (
          <StyledBox className="flex gap-2.5" pr="20px">
            {navButton}
          </StyledBox>
        )}
      </StyledBox>
      <FormControl display={'flex'} justifyContent={'center'}>
        {state !== null && setState !== null && (
          <Input
            width={{ base: '95vw', md: '50vw' }}
            placeholder="Search for participants..."
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        )}
      </FormControl>
    </StyledBox>
  );
};

export default NavigationMenu;
