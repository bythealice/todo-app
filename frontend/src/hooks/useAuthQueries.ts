'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService, type LoginRequest, type SignupRequest } from '@/services/authService';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      authService.saveToken(data.access_token);
      queryClient.setQueryData(['currentUser'], data.user);
      router.push('/dashboard');
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      authService.saveToken(data.access_token);
      queryClient.setQueryData(['currentUser'], data.user);
      router.push('/dashboard');
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled: typeof window !== 'undefined' && !!authService.getToken(),
    retry: false,
    staleTime: Infinity,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authService.clearToken();
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
};

