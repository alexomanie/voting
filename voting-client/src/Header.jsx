/** @jsx jsx */
import { Link, Flex, jsx, Card, Text, Box, Image } from 'theme-ui';

export const Header = ({ membersOnline }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                variant: 'cards.question',
                marginBottom: 4,
                py: 1,
                backgroundColor: '',
            }}
        >
            <Image
                sx={{ width: '48px', height: '48px', marginRight: 3 }}
                src="logo.png"
            />

            <Link
                to="/"
                sx={{
                    variant: 'styles.navlink',
                    fontSize: 5,
                    fontWeight: 'bold',
                }}
            >
                CP Q & A
            </Link>
            <div sx={{ mx: 'auto' }} />
            <Flex
                sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '24px',
                    justifyContent: 'center',
                }}
            >
                <Text sx={{ alignSelf: 'center' }}>
                    online: {membersOnline}
                </Text>
                <Box
                    sx={{ width: '16px', height: '16px' }}
                    aria-label="Toggle dark mode"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        fill="currentcolor"
                    >
                        <circle
                            r={4}
                            cx={8}
                            cy={6}
                            fill="#6da40c"
                            strokeWidth={0}
                        />
                    </svg>
                </Box>
            </Flex>
        </Card>
    );
};
